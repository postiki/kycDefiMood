import {createEvent, createStore} from "effector";

export const stage$ = createStore<number>(1)
export const stageUp = createEvent()

stage$.on(stageUp, (step) => step + 1)
