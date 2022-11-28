import './KGreetings.scss';
import React, {useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import Form from "../../UI/Form";
import Button from "../../UI/Button";
import {stageUp} from "../../../entities/progress-manager";

interface IKGreetingsProps {

}

const KGreetings: React.FC<IKGreetingsProps> = () => {
    const translation = useTranslation('greetings')

    const [sendCode, setSendCode] = useState<boolean>(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    const handleSendCode = () => {
        setSendCode(true)
    }

    const handleApplyCode = () => {
        const validCode = true;
        if (validCode) {
            stageUp()
        }
    }

    return (
        <div className="kyc-greetings">
            <div className="kyc-greetings__wrapper">
                <h1>{translation('title')}</h1>
                {!sendCode && <h2>{translation('subtitle')}</h2>}
                {sendCode && <h2>{translation('sendCode')}</h2>}

                {!sendCode &&
                    <Form
                        onChange={(e) => setEmail(e.target.value)}
                        title={translation('formTitle')}
                        placeHolder={translation('formPlaceHolder')}
                    />
                }
                {sendCode &&
                    <Form
                        onChange={(e) => setCode(e.target.value)}
                        title={translation('sendCodeFormTitle')}
                        placeHolder={translation('sendCodeFormPlaceHolder')}
                    />
                }

                {!sendCode && <Button handleClick={handleSendCode}/>}
                {sendCode && <Button handleClick={handleApplyCode}/>}
            </div>
        </div>
    );
}

export default KGreetings;
