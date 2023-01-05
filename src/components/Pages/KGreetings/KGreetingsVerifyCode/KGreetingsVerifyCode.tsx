import './KGreetingsVerifyCode.scss'

import React, {useCallback, useEffect, useState} from "react";
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
import PropTypes from "prop-types";
import {hideLoader, showLoader} from "../../../../entities/loader";

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
    handleComplete: () => void,
    outOfRefCode: () => void
}

const KGreetingsVerifyCode: React.FC<IKGreetingsVerifyCodeProps> = ({handleComplete, outOfRefCode}) => {
    const translation = useTranslation('greetings')
    const email = useStore(userEmail$)

    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [codeSend, setCodeSent] = useState(false)

    const saveUser = () => {
        showLoader()
        api.saveUser(email).then(r => {
            if(r.referralId) outOfRefCode()

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
                        handleComplete()
                        break
                }
            }

            hideLoader()
        })
    }
    //TODO remove to effector

    const handleApplyCode = async () => {
        setCodeSent(true)
        const invalid = await api.checkVerifyCode(code.split('-').join(''), localStorage.getItem('id'))
        if (!invalid) {
            setError('');
            saveUser()
        } else {
            setError('errorCode');
        }

    } //TODO remove to effector

    const handleSendCode = async () => {
        setCodeSent(true)
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
                    onClick={() => !codeSend && handleSendCode()}
                    className={classNames({
                        'disabled': codeSend && timer > 0
                    })}
                >
                    {`${translation('sendCodeSendAgain')}`}
                    {codeSend && timer > 0 && <Timer/>}
                </span>
            </p>
        </div>
    )
}

KGreetingsVerifyCode.propTypes = {
    handleComplete: PropTypes.func.isRequired,
    outOfRefCode: PropTypes.func.isRequired,
}

export default KGreetingsVerifyCode