import './KGreetingsVerifyCode.scss'

import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";
import * as api from '../../../../services/api';
import {setStage} from "../../../../entities/progress-manager";
import {useDebounce} from "react-use";
import validateEmail from "../../../../services/validateEmail";
import validateCode from "../../../../services/validateCode";

interface IKGreetingsVerifyCodeProps {
    handleComplete: () => void
}

const KGreetingsVerifyCode: React.FC<IKGreetingsVerifyCodeProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(false)

    //TODO add resend code

    const saveUser = () => {
        api.saveUser(localStorage.getItem('email')).then(r => {
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
        })
    } //TODO remove to effector

    const handleApplyCode = () => {
        api.checkVerifyCode(code, localStorage.getItem('id')).then(invalid => {
            if (!invalid) {
                setError('');
                saveUser()
            } else {
                setError('errorCode');
            }
        });
    } //TODO remove to effector

    useDebounce(
        () => {
            if (!validateCode(code)) {
                setError('incorrectCode')
                setDisabledBtn(true)
                return;
            }

            setError('')
            setDisabledBtn(false)
        },
        200,
        [code]
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
                error={translation(`${error}`)}
            />
            <Button disabled={disabledBtn} handleClick={handleApplyCode} title={translation('btnEnter')}/>
            <p>
                {translation('sendCodeNotReceive')}
                <br/>
                <span>
                    {translation('sendCodeSendAgain')}
                </span>
            </p>
        </div>
    )
}

export default KGreetingsVerifyCode