import './KGreetings.scss';
import React, {useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import KGreetingsEmail from "./KGreetingsEmail";
import KGreetingsVerifyCode from "./KGreetingsVerifyCode";
import KGreetingsReferral from "./KGreetingsReferral";
import KGreetingsComplete from "./KGreetingsComplete";
import {stageUp} from "../../../entities/progress-manager";

interface IKGreetingsProps {

}

const KGreetings: React.FC<IKGreetingsProps> = () => {
    const translation = useTranslation('greetings')

    const [stage, setStage] = useState(0)

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [referralId, setReferralId] = useState('')

    const handleCompleteEmail = (props: string) => {
        setStage(1)
        setEmail(props)
    }
    const handleCompleteVerify = (props: string) => {
        setStage(2)
        setCode(props)
    }

    const handleAddReferral = () => {
        setStage(3)
    }

    const handleCompleteReferral = (props: string) => {
        setReferralId(props)
        stageUp()
    }
    
    const handleComplete = () => {
      stageUp()
    }

    return (
        <div className="kyc-greetings">
            <div className="kyc-greetings__wrapper">
                {stage === 0 && <KGreetingsEmail handleComplete={handleCompleteEmail}/>}
                {stage === 1 && <KGreetingsVerifyCode handleComplete={handleCompleteVerify}/>}
                {stage === 2 && <KGreetingsComplete handleComplete={handleComplete} handleAddReferral={handleAddReferral}/>}
                {stage === 3 && <KGreetingsReferral handleComplete={handleCompleteReferral}/>}
            </div>
        </div>
    );
}

export default KGreetings;
