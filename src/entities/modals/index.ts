import {createEvent, createStore} from "effector";
import modalTypes from "./modalTypes";

export const modal$ = createStore<string>(modalTypes.EMAIL_VERIFY)

export const showModal = createEvent<string>()

modal$.on(showModal, (_, payload) => payload)