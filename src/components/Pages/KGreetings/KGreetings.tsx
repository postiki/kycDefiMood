import './KGreetings.scss';
import React, {useState} from 'react';

import KGreetingsEmail from "./KGreetingsEmail";
import KGreetingsVerifyCode from "./KGreetingsVerifyCode";
import KGreetingsReferral from "./KGreetingsReferral";
import KGreetingsComplete from "./KGreetingsComplete";
import {stageUp} from "../../../entities/progress-manager";

const stageHighSeiz = {
    0: '245px',
    1: '308px',
    2: '237px',
    3: '254px',
}

interface IKGreetingsProps {

}

const KGreetings: React.FC<IKGreetingsProps> = () => {
    const [stage, setStage] = useState(0)

    const [email, setEmail] = useState('')
    const [referralId, setReferralId] = useState('')

    const handleCompleteEmail = (props: string) => {
        setStage(1)
        setEmail(props)

    }
    const handleCompleteVerify = () => {
        setStage(2)
    }

    const handleAddReferral = () => {
        setStage(3)
    }

    const handleCompleteReferral = (props: string) => {
        setReferralId(props)
        stageUp()
    }

    const handleComplete = () => {
        //TODO send here state to backend

        stageUp()
    }

    // @ts-ignore
    const size = stageHighSeiz[stage];

    const witchSize = window.innerWidth > 1366 ? '298px' : size

    return (
        <div className="kyc-greetings"
             style={{
                 height: witchSize
             }}
        >
            <div className="kyc-greetings__wrapper">
                {stage === 0 && <KGreetingsEmail handleComplete={handleCompleteEmail}/>}
                {stage === 1 && <KGreetingsVerifyCode handleComplete={handleCompleteVerify}/>}
                {stage === 2 &&
                    <KGreetingsComplete handleComplete={handleComplete} handleAddReferral={handleAddReferral}/>}
                {stage === 3 && <KGreetingsReferral handleComplete={handleCompleteReferral}/>}
            </div>
        </div>
    );
}

export default KGreetings;
