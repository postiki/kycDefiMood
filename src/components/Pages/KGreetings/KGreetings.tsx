import './KGreetings.scss';
import React, {useState} from 'react';

import KGreetingsEmail from "./KGreetingsEmail";
import KGreetingsVerifyCode from "./KGreetingsVerifyCode";
import KGreetingsReferral from "./KGreetingsReferral";
import KGreetingsComplete from "./KGreetingsComplete";
import {stageUp} from "../../../entities/progress-manager";
import ModalPage from "../../UI/ModalPage";

const stageHighSeizMobile = {
    0: '265px',
    1: '308px',
    2: '237px',
    3: '254px',
}

const stageHighSeiz = {
    0: '228px',
    1: '271px',
    2: '183px',
    3: '228px',
}

interface IKGreetingsProps {

}

const KGreetings: React.FC<IKGreetingsProps> = () => {
    const [stage, setStage] = useState(0)

    const handleCompleteEmail = () => {
        setStage(1)

    }
    const handleCompleteVerify = () => {
        setStage(2)
    }

    const handleAddReferral = () => {
        setStage(3)
    }

    const handleCompleteReferral = () => {
        stageUp()
    }

    const handleComplete = () => {
        stageUp()
    }

    // @ts-ignore
    const sizeMobile = stageHighSeizMobile[stage];
    // @ts-ignore
    const size = stageHighSeiz[stage];

    const witchSize = window.innerWidth > 1366 ? size : sizeMobile

    return (
        <ModalPage>
            <div className="kyc-greetings"
                 style={{
                     height: witchSize
                 }}
            >
                {stage === 0 && <KGreetingsEmail handleComplete={handleCompleteEmail}/>}
                {stage === 1 && <KGreetingsVerifyCode handleComplete={handleCompleteVerify}/>}
                {stage === 2 &&
                    <KGreetingsComplete handleComplete={handleComplete} handleAddReferral={handleAddReferral}/>}
                {stage === 3 && <KGreetingsReferral handleComplete={handleCompleteReferral}/>}
            </div>
        </ModalPage>
    );
}

export default KGreetings;
