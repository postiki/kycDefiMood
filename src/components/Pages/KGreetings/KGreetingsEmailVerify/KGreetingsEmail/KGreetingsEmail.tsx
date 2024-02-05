import './KGreetingsEmail.scss'
import React, {useEffect, useState} from "react";

import useTranslation from "../../../../../hooks/useTranslation";
import Form from "../../../../UI/Form";
import Button from "../../../../UI/Button";
import {useDebounce} from "react-use";
import validateEmail from "../../../../../services/validateEmail";
import ModalPage from "../../../../UI/ModalPage";
import {sendCode} from "../../../../../entities/KYC/email-verification";

interface IKGreetingsEmailProps {
    handleSendCode: () => void
}

const KGreetingsEmail: React.FC<IKGreetingsEmailProps> = ({handleSendCode}) => {
    const translation = useTranslation('greetings')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(true)

    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                !disabledBtn && sendCode(email)
                handleSendCode()

            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [disabledBtn]);

    useDebounce(
        () => {
            if (email.length === 0) {
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
        <ModalPage>
            <div className={'greetings-email'}>
                <h1>{translation('title')}</h1>
                <h2>{translation('subtitle')}</h2>
                <Form
                    onChange={(e) => setEmail(e.target.value)}
                    title={translation('formTitle')}
                    placeHolder={translation('formPlaceHolder')}
                    value={email}
                    enabledError
                    error={translation(`${error}`)}
                />
                <Button
                    disabled={disabledBtn}
                    handleClick={() => {
                        sendCode(email)
                        handleSendCode()
                    }}
                    title={translation('btnEnter')}
                />
            </div>
        </ModalPage>
    )
}

export default KGreetingsEmail