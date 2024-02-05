import {createEvent, sample} from "effector";
import {attach} from "effector/effector.umd";
import {userId$} from "../../user";
import * as api from '../../../services/api'
import {performTransition} from "../controller";

interface IPersonalInfo {
    name: string | null,
    date: string | null,
    citizenship: string | null,
    residence: string | null,
    docType: string | null,
    docNumber: string | null,
    addr: string | null
}
export const savePersonalInfo = createEvent<IPersonalInfo>()

export const savePersonalInfoFX = attach({
    source: userId$,
    effect: async (source, data: IPersonalInfo) => await api.addPersonalInfo(source, data)
})

savePersonalInfoFX.doneData.watch((r) => {
    performTransition('next')
})

sample({
    clock: savePersonalInfo,
    target: [savePersonalInfoFX]
})