import {createEvent, createStore} from "effector";

export const stage$ = createStore<number>(1)
export const stageUp = createEvent()
export const stageDown = createEvent()
export const setStage = createEvent<number>()

stage$.on(stageUp, (step) => step + 1)
stage$.on(stageDown, (step) => step - 1)
stage$.on(setStage, (_,  stage) => stage)
