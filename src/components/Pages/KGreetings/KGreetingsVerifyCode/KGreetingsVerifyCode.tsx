import './KGreetingsVerifyCode.scss'

import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";

interface IKGreetingsVerifyCodeProps {
    handleComplete: (props: string) => void
}

const KGreetingsVerifyCode: React.FC<IKGreetingsVerifyCodeProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [code, setCode] = useState('')

    const handleApplyCode = () => {
        handleComplete(code)
    }

    return (
        <div className={'greetings-verify'}>
            <h1>{translation('title')}</h1>
            <h2>{translation('sendCode')}</h2>
            <Form
                onChange={(e) => setCode(e.target.value)}
                title={translation('sendCodeFormTitle')}
                placeHolder={translation('sendCodeFormPlaceHolder')}
                small
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