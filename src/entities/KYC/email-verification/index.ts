import {attach, createEffect, createEvent, sample} from "effector";
import * as api from "../../../services/api";
import {idGenerator} from "../../../services/idGenerator";
import {addEmailConfirmationId, addUserEmail, addUserId, emailConfirmationId$, userEmail$, userType$} from "../../user";
import {disabledAddRefCode} from "../referral";
import {performTransition} from "../controller";


//Send code
export const sendCode = createEvent<string>()
export const sendCodeFx = createEffect(async (userEmail: string) => {
    const r = await api.getVerifyCode(userEmail, idGenerator(24))
    return r.id
})

sample({
    clock: sendCode,
    target: [sendCodeFx, addUserEmail]
})
sample({
    clock: sendCodeFx.doneData,
    target: addEmailConfirmationId
})


//Resend code
export const reSendCode = createEvent<string>()
export const reSendCodeFx = createEffect(async (userEmail: string) => {
    const r = await api.getVerifyCode(userEmail, idGenerator(24))
    return r.id
})

sample({
    clock: reSendCode,
    target: [reSendCodeFx, addUserEmail]
})
sample({
    clock: reSendCodeFx.doneData,
    target: addEmailConfirmationId
})


//Verify code
export const checkCode = createEvent<string>()
export const checkCodeFx = attach({
    source: emailConfirmationId$,
    effect: async (source, code) => await api.checkVerifyCode(code.split('-').join(''), source)
})//TODO catch here incorrect code with .finally at fx

sample({
    clock: checkCode,
    target: checkCodeFx
})

export const checkUserStatusFx = attach({
    source: userEmail$,
    effect: async (source: string) => {
        return await api.checkUserStatus(source)
    }
})//TODO catch error && redirect to needed page

sample({
    clock: checkCodeFx.doneData,
    target: checkUserStatusFx
})


//Save user or get status
export const saveUserFx = attach({
    source: {email: userEmail$, type: userType$},
    effect: async (source: any ) => {
        return await api.saveUser(source.email, source.type)
    }
})

sample({
    source: checkUserStatusFx.doneData,
    filter: r => r.new === true,
    target: saveUserFx
})

export const getUserIdFx = attach({
    source: userEmail$,
    effect: async (source: string) => {
        return await api.getUserId(source)
    }
})

sample({
    source: checkUserStatusFx.doneData,
    filter: r => r.new === false,
    target: getUserIdFx
})

interface IStage {
    REFERRAL: boolean,
    PERSONAL: boolean,
    PROJECT: boolean,
    IDENTIFY_DOC: boolean,
    IDENTIFY_SELFIE: boolean,
    INTERVIEW: boolean
}

interface IExistUser {
    token: string,
    stage: IStage,
}

export const redirectToNeededStepFx = createEffect((data: IExistUser) => {
        //TODO refactor
        console.log(data)

        if (data.token) {
            addUserId(data.token)
        }

        if (data.stage) {
            const referral = data.stage.REFERRAL
            const personal = data.stage.PERSONAL
            const project = data.stage.PROJECT
            const doc = data.stage.IDENTIFY_DOC
            const selfie = data.stage.IDENTIFY_SELFIE
            const interview = data.stage.INTERVIEW

            if (referral) {
                disabledAddRefCode()
            }

            if (!personal) {
                performTransition('NEXT')
            }
            if (!project) {
                performTransition('PROJECT')
            }
            if (!doc) {
                performTransition('IDENTIFY_DOC')
            }
            if (!selfie) {
                performTransition('IDENTIFY_SELFIE')
            }
            if (!interview) {
                performTransition('INTERVIEW')
            }
        }
    }
)

sample({
    source: getUserIdFx.doneData,
    target: redirectToNeededStepFx
})

sample({
    clock: saveUserFx.doneData,
    target: [addUserId]
})

saveUserFx.doneData.watch((r) => {
    performTransition('next')
})