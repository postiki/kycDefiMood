import {createEvent, createStore} from "effector";
import {pending} from 'patronum';
import {
    checkCodeFx,
    checkUserStatusFx,
    getUserIdFx,
    reSendCodeFx,
    saveUserFx,
    sendCodeFx
} from "../KYC/email-verification";
import {savePersonalInfoFX} from "../KYC/personal";
import {saveProjectInfoFX} from "../KYC/project";
import {saveRefIdFx} from "../KYC/referral";
import {initConfigFx} from "../KYC/controller";

export const showingLoader$ = createStore<boolean>(false)
export const showLoader = createEvent()
export const hideLoader = createEvent()

showingLoader$
    .on(showLoader, (_) => true)
    .on(hideLoader, (_) => false)

export const processing$ = pending({
    effects: [
        sendCodeFx,
        reSendCodeFx,
        checkCodeFx,
        checkUserStatusFx,
        saveUserFx,
        getUserIdFx,
        savePersonalInfoFX,
        saveProjectInfoFX,
        saveRefIdFx,
        initConfigFx,
    ]
});