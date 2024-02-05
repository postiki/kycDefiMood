import './KGreetingsComplete.scss'

import React, {useEffect} from "react";

import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import {useStore} from "effector-react";
import ModalPage from "../../../UI/ModalPage";
import {enableAddRefCode$} from "../../../../entities/KYC/referral";
import {performTransition} from "../../../../entities/KYC/controller";

interface IKGreetingsCompleteProps {

}

const KGreetingsComplete: React.FC<IKGreetingsCompleteProps> = () => {
    const translation = useTranslation('greetings')
    const enableAddRefCode = useStore(enableAddRefCode$)

    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                performTransition('next')
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, []);

    return (
        <ModalPage>
            <div className={'greetings-complete'}>
                <h1>{translation('title')}</h1>
                <h2>{translation('completeTitle')}<br/>ヽ(・∀・)ﾉ</h2>
                <Button
                    handleClick={() => {
                        performTransition('next')
                    }}
                    title={translation('btnContinue')}
                />
                {enableAddRefCode &&
                    <p>
                        {translation('enabledReferral')}
                        <br/>
                        <span
                            onClick={() => {
                                performTransition('referral')
                            }}
                        >
                    {translation('enterCode')}
                    </span>
                    </p>
                }
            </div>
        </ModalPage>
    )
}

KGreetingsComplete.propTypes = {}

export default KGreetingsComplete