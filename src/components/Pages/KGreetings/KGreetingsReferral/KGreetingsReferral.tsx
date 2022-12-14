import './KGreetingsReferral.scss'
import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";

import * as api from '../../../../services/api';
import {useStore} from "effector-react";
import {userEmail$} from "../../../../entities/progress-manager";

interface IKGreetingsReferralProps {
    handleComplete: () => void
}

const KGreetingsReferral: React.FC<IKGreetingsReferralProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [referralId, setReferralId] = useState('')
    const email = useStore(userEmail$)

    const handleApply = () => {
        api.addRefCode(email, referralId.split('-').join('')).then(r => r.ok && handleComplete())
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
                mask={'999-999-999'}
            />
            <Button handleClick={handleApply} title={translation('btnEnter')}/>
        </div>
    )
}

export default KGreetingsReferral