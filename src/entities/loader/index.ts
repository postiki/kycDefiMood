import {createEvent, createStore} from "effector";

export const showingLoader$ = createStore<boolean>(false)

export const showLoader = createEvent()
export const hideLoader = createEvent()

showingLoader$
    .on(showLoader, (_) => true)
    .on(hideLoader, (_) => false)