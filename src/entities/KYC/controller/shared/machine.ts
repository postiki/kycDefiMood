import {showModal} from "../../../modals";
import modalTypes from "../../../modals/modalTypes";

class StateMachine {
    private _onUpdate?: (newState: any) => void;

    constructor(
        public transitions: any,
        public states: any,
        public state: any,
        public data?: any
    ) {
    }


    stateOf() {
        return this.state;
    }

    _updateState(newState: any, data = null) {
        this.state = newState;
        this.data = data;
    }

    async performTransition(transitionName: any) {
        const possibleTransitions = this.transitions[this.state]
        const transition = possibleTransitions[transitionName.toUpperCase()]

        if (!transition) return

        // @ts-ignore
        showModal(modalTypes[transition])
        this._updateState(transition)
    }
}

export default StateMachine;