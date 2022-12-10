import './KGreetingsReferral.scss'
import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";

import * as api from '../../../../services/api';

interface IKGreetingsReferralProps {
    handleComplete: (props: string) => void
}

const KGreetingsReferral: React.FC<IKGreetingsReferralProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [referralId, setReferralId] = useState('')

    const handleApply = () => {
        api.addRefCode(localStorage.getItem('email'), referralId).then(r => r.ok && handleComplete(referralId))
    }

    return (
        <div className={'greetings-referral'}>
            <h1>{translation('title')}</h1>
            <h2>{translation('referralCode')}</h2>
            <Form
                onChange={(e) => setReferralId(e.target.value)}
                title={translation('referralFormTitle')}
                placeHolder={translation('referralFormPlaceHolder')}
                small
                value={referralId}
            />
            <Button handleClick={handleApply} title={translation('btnEnter')}/>
        </div>
    )
}

export default KGreetingsReferral