import './KGreetingsVerifyCode.scss'

import React, {useEffect, useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";
import * as api from '../../../../services/api';
import {setStage, userEmail$} from "../../../../entities/progress-manager";
import {useDebounce} from "react-use";
import validateCode from "../../../../services/validateCode";
import {useStore} from "effector-react";
import {idGenerator} from "../../../../services/idGenerator";
import classNames from "classnames";

interface IKGreetingsVerifyCodeProps {
    handleComplete: () => void
}

const KGreetingsVerifyCode: React.FC<IKGreetingsVerifyCodeProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const email = useStore(userEmail$)

    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(false)

    const saveUser = () => {
        api.saveUser(email).then(r => {
            if (r.stage) {
                const completeStage = r.stage

                switch (completeStage) {
                    case '2':
                        handleComplete()
                        break
                    case '3':
                        setStage(3)
                        break
                    case '4':
                        setStage(4)
                        break
                    case '5':
                        setStage(5)
                        break
                    case '6':
                        setStage(6)
                        break
                }
                setSendCode(false)
            }
        })
    } //TODO remove to effector

    const [sendCode, setSendCode] = useState(false)
    const [codeSendAt, setCodeSendAt] = useState(0)
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);

    const deadline = Date.now() + 60000;
    const getTime = (deadline: number) => {
        const time = deadline - Date.now();

        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, [codeSendAt]);

    const handleApplyCode = async () => {
        setSendCode(true)
        setCodeSendAt(Date.now())
        const invalid = await api.checkVerifyCode(code.split('-').join(''), localStorage.getItem('id'))
        if (!invalid) {
            setError('');
            saveUser()
        } else {
            setError('errorCode');
        }

    } //TODO remove to effector

    const handleSendCode = async () => {
        setSendCode(true)
        setCodeSendAt(Date.now())
        const result = await api.getVerifyCode(email, idGenerator(24))
        if (result.id) {
            localStorage.setItem('id', result.id)
        }
    } //TODO remove to effector

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

    return (
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
            <Button disabled={disabledBtn} handleClick={handleApplyCode} title={translation('btnEnter')}/>
            <p>
                {translation('sendCodeNotReceive')}
                <br/>
                <span
                    onClick={handleSendCode}
                    className={classNames({
                        'disabled': seconds > 0 && sendCode
                    })}
                >
                    {`${translation('sendCodeSendAgain')}`}
                    {seconds > 0 && sendCode && `[${minutes}:${seconds}]`}
                </span>
            </p>
        </div>
    )
}

export default KGreetingsVerifyCode