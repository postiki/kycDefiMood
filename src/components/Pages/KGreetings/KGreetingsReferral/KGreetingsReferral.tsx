import './KGreetingsReferral.scss'
import React, {useEffect, useState} from "react";
import {useDebounce} from "react-use";

import useTranslation from "../../../../hooks/useTranslation";
import Form from "../../../UI/Form";
import Button from "../../../UI/Button";
import ModalPage from "../../../UI/ModalPage";
import {addReferralCode} from "../../../../entities/KYC/referral";
import {performTransition} from "../../../../entities/KYC/controller";

interface IKGreetingsReferralProps {
}

const KGreetingsReferral: React.FC<IKGreetingsReferralProps> = () => {
    const translation = useTranslation('greetings')
    const [referralId, setReferralId] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [error, setError] = useState('')
    const disabled = !referralId;

    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                !disabledBtn && addReferralCode(referralId);
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [disabledBtn]);

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
        <ModalPage>
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
                    <Button
                        disabled={disabledBtn || disabled}
                        handleClick={() => {
                            addReferralCode(referralId)
                        }}
                        title={translation('btnEnter')
                        }/>
                    <Button
                        alt
                        handleClick={() => {
                            performTransition('prev')
                        }}
                        title={translation('goBack')}
                    />
                </div>
            </div>
        </ModalPage>
    )
}

KGreetingsReferral.propTypes = {}

export default KGreetingsReferral