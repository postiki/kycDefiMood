import './KGreetingsComplete.scss'
import React from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";

interface IKGreetingsCompleteProps {
    handleComplete: () => void,
    handleAddReferral: () => void,
}

const KGreetingsComplete: React.FC<IKGreetingsCompleteProps> = ({handleComplete, handleAddReferral}) => {
    const translation = useTranslation('greetings')

    return (
        <div className={'greetings-complete'}>
            <h1>{translation('title')}</h1>
            <h2>{translation('completeTitle')}</h2>
            <Button handleClick={handleComplete} title={translation('btnContinue')}/>
            <p>
                {translation('enabledReferral')}
                <br/>
                <span onClick={handleAddReferral}>
                    {translation('enterCode')}
                </span>
            </p>
        </div>
    )
}

export default KGreetingsComplete