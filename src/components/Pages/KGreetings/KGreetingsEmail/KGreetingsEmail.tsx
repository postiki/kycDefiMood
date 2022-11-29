import './KGreetingsEmail.scss'
import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";

interface IKGreetingsEmailProps {
    handleComplete: (props: string) => void
}

const KGreetingsEmail: React.FC<IKGreetingsEmailProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [email, setEmail] = useState('')

    const handleSendCode = () => {
        handleComplete(email)
    }

    return (
        <div className={'greetings-email'}>
            <h1>{translation('title')}</h1>
            <h2>{translation('subtitle')}</h2>
            <Form
                onChange={(e) => setEmail(e.target.value)}
                title={translation('formTitle')}
                placeHolder={translation('formPlaceHolder')}
            />
            <Button handleClick={handleSendCode} title={translation('btnEnter')}/>
        </div>
    )
}

export default KGreetingsEmail