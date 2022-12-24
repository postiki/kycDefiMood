import './KGreetings.scss';
import React, {useState} from 'react';

import KGreetingsEmail from "./KGreetingsEmail";
import KGreetingsVerifyCode from "./KGreetingsVerifyCode";
import KGreetingsReferral from "./KGreetingsReferral";
import KGreetingsComplete from "./KGreetingsComplete";
import {stageUp} from "../../../entities/progress-manager";
import ModalPage from "../../UI/ModalPage";
import KGreetingsWallet from "./KGreetingsWallet";
import PropTypes from "prop-types";
import useTranslation from "../../../hooks/useTranslation";

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
    isExpired: boolean
}

const KGreetings: React.FC<IKGreetingsProps> = ({isExpired}) => {
    const translation = useTranslation('greetings')
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

    const handleGoBackReferral = () => {
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

    if (isExpired){
        return (
            <ModalPage>
                <div className="kyc-greetings-mobile">
                    <h1 className={'mobile'}>{translation('tokenExpired')}</h1>
                </div>
            </ModalPage>
        )
    }

    return (
        <ModalPage>
            <div className="kyc-greetings"
                 style={{
                     height: witchSize
                 }}
            >
                {/*{stage === 0 && <KGreetingsVerifyCode handleComplete={handleCompleteVerify}/>}*/}
                {stage === 0 && <KGreetingsReferral handleComplete={handleCompleteReferral} handleGoBack={handleGoBackReferral}/>}
                {/*{stage === 0 && <KGreetingsWallet handleComplete={handleCompleteWallet}/>}*/}

                {/*{stage === 0 && <KGreetingsWallet handleComplete={handleCompleteWallet}/>}*/}
                {/*{stage === 1 && <KGreetingsEmail handleComplete={handleCompleteEmail}/>}*/}
                {/*{stage === 2 && <KGreetingsVerifyCode handleComplete={handleCompleteVerify} />}*/}
                {/*{stage === 3 &&*/}
                {/*    <KGreetingsComplete handleComplete={handleComplete} handleAddReferral={handleAddReferral}/>}*/}
                {/*{stage === 4 && <KGreetingsReferral handleComplete={handleCompleteReferral} handleGoBack={handleGoBackReferral}/>}*/}
            </div>
        </ModalPage>
    );
}

KGreetings.propTypes ={
    isExpired:PropTypes.bool.isRequired,
}

export default KGreetings;
