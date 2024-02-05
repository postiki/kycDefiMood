import {createEvent, createStore, sample} from "effector";
import {showModal} from "../../modals";
import {controller} from "../controller";

export const status$ = createStore<string>('EMAIL_VERIFY')
export const stepNumber$ = createStore<number>(0)
export const passedSteps$ = createStore<any>('')

export const updateStatus = createEvent<string>()

status$.on(updateStatus, (state, payload) => payload)

const updatePassedStep = createEvent<any>()

passedSteps$.on(updatePassedStep, (state, payload) =>
    ({...state, [payload]: true})
)

const updateStepNumber = createEvent<string>()

stepNumber$.on(updateStepNumber, (state, payload) => Object.keys(controller.getState()).indexOf(payload)
)

sample({
    clock: showModal,
    target: [updateStatus, updateStepNumber, updatePassedStep],
})
