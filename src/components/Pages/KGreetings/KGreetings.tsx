import './KGreetings.scss';
import React, {useState} from 'react';

import KGreetingsEmail from "./KGreetingsEmail";
import KGreetingsVerifyCode from "./KGreetingsVerifyCode";
import KGreetingsReferral from "./KGreetingsReferral";
import KGreetingsComplete from "./KGreetingsComplete";
import {stageUp} from "../../../entities/progress-manager";
import ModalPage from "../../UI/ModalPage";
import KGreetingsWallet from "./KGreetingsWallet";

const stageHighSeizMobile = {
    0: '265px',
    1: '265px',
    2: '308px',
    3: '237px',
    4: '254px',
}

const stageHighSeiz = {
    0: '228px',
    1: '228px',
    2: '271px',
    3: '183px',
    4: '228px',
}

interface IKGreetingsProps {

}

const KGreetings: React.FC<IKGreetingsProps> = () => {
    const [stage, setStage] = useState(0)

    const handleCompleteWallet = () => {
      setStage(1)
    }

    const handleCompleteEmail = () => {
        setStage(2)

    }
    const handleCompleteVerify = () => {
        setStage(3)
    }

    const handleAddReferral = () => {
        setStage(4)
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
