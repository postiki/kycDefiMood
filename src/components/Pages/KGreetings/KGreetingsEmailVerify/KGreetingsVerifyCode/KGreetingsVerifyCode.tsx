import './KGreetingsVerifyCode.scss'

import React, {useCallback, useEffect, useState} from "react";
import useTranslation from "../../../../../hooks/useTranslation";
import Form from "../../../../UI/Form";
import Button from "../../../../UI/Button";
import {useDebounce} from "react-use";
import validateCode from "../../../../../services/validateCode";
import {useStore} from "effector-react";
import classNames from "classnames";
import {userEmail$} from "../../../../../entities/user";
import ModalPage from "../../../../UI/ModalPage";
import {checkCode, reSendCode} from "../../../../../entities/KYC/email-verification";

const Timer = () => {
    const [timer, setTimer] = useState(60);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

    useEffect(() => {
        timer > 0 && setTimeout(timeOutCallback, 1000);
    }, [timer, timeOutCallback]);

    return (
        <>{`[${timer}]`}</>
    )
}

interface IKGreetingsVerifyCodeProps {

}

const KGreetingsVerifyCode: React.FC<IKGreetingsVerifyCodeProps> = () => {
    const translation = useTranslation('greetings')
    const email = useStore(userEmail$)

    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [codeSend, setCodeSent] = useState(false)

    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                !disabledBtn && checkCode(code)
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [disabledBtn]);

    useDebounce(
        () => {
            if (!validateCode(code.split('-').join(''))) {
                setError('incorrectCode')
                setDisabledBtn(true)
                return;
            }

            setError('')
            setDisabledBtn(false)
        }, 200, [code]
    );

    const [timer, setTimer] = useState(60);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

    useEffect(() => {
        if (codeSend) timer > 0 && setTimeout(timeOutCallback, 1000);
    }, [timer, timeOutCallback, codeSend]);

    useEffect(() => {
        if (timer === 0) {
            setCodeSent(false)
            setTimer(60)
        }
    }, [timer])


    const handleResendCode = () => {
        reSendCode(email)
        setCodeSent(true)
    }

    return (
        <ModalPage>
            <div className={'greetings-verify'}>
                <h1>{translation('title')}</h1>
                <h2>{translation('sendCode')}</h2>
                <Form
                    onChange={(e) => setCode(e.target.value)}
                    title={translation('sendCodeFormTitle')}
                    placeHolder={translation('sendCodeFormPlaceHolder')}
                    small
                    value={code}
                    enabledError
                    error={translation(`${error}`)}
                    mask={'999-999'}
                />
                <Button disabled={disabledBtn && code.length !== 6} handleClick={() => checkCode(code)}
                        title={translation('btnEnter')}/>
                <p>
                    {translation('sendCodeNotReceive')}
                    <br/>
                    <span
                        onClick={() => {
                            !codeSend && handleResendCode()
                        }}
                        className={classNames({
                            'disabled': codeSend && timer > 0
                        })}
                    >
                    {`${translation('sendCodeSendAgain')}`}
                        {codeSend && timer > 0 && <Timer/>}
                </span>
                </p>
            </div>
        </ModalPage>
    )
}

KGreetingsVerifyCode.propTypes = {}

export default KGreetingsVerifyCode