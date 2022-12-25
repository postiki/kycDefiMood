import './KGreetingsReferral.scss'
import React, {useEffect, useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";

import * as api from '../../../../services/api';
import {useStore} from "effector-react";
import {userEmail$} from "../../../../entities/progress-manager";
import {useDebounce} from "react-use";
import PropTypes from "prop-types";

interface IKGreetingsReferralProps {
    handleComplete: () => void
    handleGoBack: () => void
}

const KGreetingsReferral: React.FC<IKGreetingsReferralProps> = ({handleComplete, handleGoBack}) => {
    const translation = useTranslation('greetings')
    const [referralId, setReferralId] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [error, setError] = useState('')
    const email = useStore(userEmail$)

    const disabled = !referralId;

    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                handleComplete();
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, []);

    const handleApply = () => {
        api.addRefCode(email, referralId.split('-').join('')).then(success => {
            if (success) handleComplete()
        })
    }

    const regExRefId = /^[a-zA-Z]*$/;
    const validRefId = (regExRefId.test(referralId.split('-').join('') || '') || referralId === '');

    useDebounce(
        () => {
            if (referralId && !validRefId) {
                setError('error')
                setDisabledBtn(true)
                return
            } else {
                setError('')
            }

            setDisabledBtn(false)
        },
        200,
        [referralId]
    );

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
                mask={'aaa-aaa-aaa'}
                error={error}
            />
            <div className={'greetings-referral-buttons'}>
                <Button disabled={disabledBtn || disabled} handleClick={handleApply} title={translation('btnEnter')}/>
                <Button alt handleClick={handleGoBack} title={translation('goBack')}/>
            </div>
        </div>
    )
}

KGreetingsReferral.propTypes = {
    handleComplete: PropTypes.func.isRequired,
    handleGoBack: PropTypes.func.isRequired
}

export default KGreetingsReferral