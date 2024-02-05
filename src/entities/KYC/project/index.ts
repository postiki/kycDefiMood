import {createEvent, sample} from "effector";
import {attach} from "effector/effector.umd";
import {userId$} from "../../user";
import * as api from "../../../services/api";
import {performTransition} from "../controller";

interface IProjectInfo {
    addrProject: string | null,
    projectChain: string | null,
    pName: string | null,
    pSite: string | null,
    pDesc: string | null,
    pGh: string | null,
    pTw: string | null,
    pDc: string | null,
    pTg: string | null,
}

export const saveProjectInfo = createEvent<IProjectInfo>()

export const saveProjectInfoFX = attach({
    source: userId$,
    effect: async (source, data: IProjectInfo) => await api.addProjectInfo(source, data)
})

saveProjectInfoFX.doneData.watch((r) => {
    performTransition('next')
})

sample({
    clock: saveProjectInfo,
    target: [saveProjectInfoFX]
})