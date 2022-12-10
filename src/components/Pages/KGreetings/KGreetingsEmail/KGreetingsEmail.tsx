import './KGreetingsEmail.scss'
import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";

import * as api from '../../../../services/api';
import {idGenerator} from "../../../../services/idGenerator";
import {useDebounce} from "react-use";
import validateEmail from "../../../../services/validateEmail";

interface IKGreetingsEmailProps {
    handleComplete: (props: string) => void
}

const KGreetingsEmail: React.FC<IKGreetingsEmailProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(true)

    const handleSendCode = () => {
        api.getVerifyCode(email, idGenerator(24)).then(r => {
            localStorage.setItem('id', r.id)
            localStorage.setItem('email', email)
            handleComplete(email)
        })
    } //TODO remove to effector

    useDebounce(
        () => {
            if(email.length === 0){
                setDisabledBtn(true)
                return;
            }
            if (!validateEmail(email)) {
                setError('errorEmail')
                setDisabledBtn(true)
                return;
            }

            setError('')
            setDisabledBtn(false)
        },
        200,
        [email]
    );

    return (
        <div className={'greetings-email'}>
            <h1>{translation('title')}</h1>
            <h2>{translation('subtitle')}</h2>
            <Form
                onChange={(e) => setEmail(e.target.value)}
                title={translation('formTitle')}
                placeHolder={translation('formPlaceHolder')}
                value={email}
                error={translation(`${error}`)}
            />
            <Button disabled={disabledBtn} handleClick={handleSendCode} title={translation('btnEnter')}/>
        </div>
    )
}

export default KGreetingsEmail