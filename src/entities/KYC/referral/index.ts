import {attach, createEvent, createStore, sample} from "effector";
import {userId$} from "../../user";
import * as api from "../../../services/api";
import {performTransition} from "../controller";

//Add referral code
export const enableAddRefCode$ = createStore<boolean>(true)
export const disabledAddRefCode = createEvent()
enableAddRefCode$.on(disabledAddRefCode, (_) => false)

export const addReferralCode = createEvent<string>()
export const saveRefIdFx = attach({
    source: userId$,
    effect: async (source, code) => await api.addRefCode(source, code.split('-').join(''))
})//TODO catch error

saveRefIdFx.doneData.watch(() => performTransition('next'))

sample({
    clock: addReferralCode,
    target: saveRefIdFx
})