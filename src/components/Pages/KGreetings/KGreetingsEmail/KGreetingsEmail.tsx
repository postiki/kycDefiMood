import './KGreetingsEmail.scss'
import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";

import * as api from '../../../../services/api';
import {idGenerator} from "../../../../services/idGenerator";

interface IKGreetingsEmailProps {
    handleComplete: (props: string) => void
}

const KGreetingsEmail: React.FC<IKGreetingsEmailProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [email, setEmail] = useState('')

    const handleSendCode = () => {
        api.getVerifyCode(email, idGenerator(24)).then(r => {
            localStorage.setItem('id', r.id)
            localStorage.setItem('email', email)
            handleComplete(email)
        })
        // localStorage.setItem('email', email)//TODO remove
        // handleComplete(email)//TODO remove
    }

    const disabledButton = false; //TODO add regex

    return (
        <div className={'greetings-email'}>
            <h1>{translation('title')}</h1>
            <h2>{translation('subtitle')}</h2>
            <Form
                onChange={(e) => setEmail(e.target.value)}
                title={translation('formTitle')}
                placeHolder={translation('formPlaceHolder')}
                value={email}
            />
            <Button disabled={disabledButton} handleClick={handleSendCode} title={translation('btnEnter')}/>
        </div>
    )
}

export default KGreetingsEmail