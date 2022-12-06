import './KGreetingsVerifyCode.scss'

import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";
import * as api from '../../../../services/api';
import {setStage} from "../../../../entities/progress-manager";

interface IKGreetingsVerifyCodeProps {
    handleComplete: () => void
}

const KGreetingsVerifyCode: React.FC<IKGreetingsVerifyCodeProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [code, setCode] = useState('')
    const [err, setErr] = useState('')

    const saveUser = () => {
        api.saveUser(localStorage.getItem('email')).then(r => {
            console.log(r)
            const completeStage = r.stage

            switch (completeStage){
                case '2': handleComplete()
                    break
                case '3': setStage(3)
                    break
            }
        })
    } //TODO remove to effector

    const handleApplyCode = () => {
        api.checkVerifyCode(code, localStorage.getItem('id')).then(invalid => {
            if (!invalid) {
                setErr('');
                saveUser()
            } else {
                setErr('not valid code');
            }
        });
    } //TODO remove to effector

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
            />
            <Button handleClick={handleApplyCode} title={translation('btnEnter')}/>
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