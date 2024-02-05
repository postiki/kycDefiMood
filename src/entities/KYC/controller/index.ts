import {attach, createEvent, createStore, sample} from "effector";
import StateMachine from "./shared/machine";
import {createEffect} from "effector/effector.umd";
import * as api from "../../../services/api";
import {addUserEmail, addUserId, addUserType} from "../../user";
import modalTypes from "../../modals/modalTypes";

export const controller = createStore<any>(null)
export const initConfig = createEvent<any>()
export const pathConfig = createEvent<any>()

controller.on(pathConfig, (_, payload) => new StateMachine(payload.transitions, payload.config, payload.config.INITIAL))

export const performTransition = attach({
    source: controller,
    effect: (source, transition) => {
        source.performTransition(transition)
    }
})

//TODO refactor
export const initConfigFx = createEffect(async (props: any) => {
    const config = await api.getConfig(props.config)
    await pathConfig(config)


    if (props.decodedToken) {
        const splitToken = props.decodedToken.info.split(':')
        addUserEmail(splitToken[1])
        addUserId(splitToken[2])

        const to = splitToken[0] === 'doc' ? modalTypes.IDENTIFY_DOC : modalTypes.IDENTIFY_SELFIE
        performTransition(`${to}`)
    }
})

sample({
    clock: initConfig,
    target: [addUserType, initConfigFx]
})