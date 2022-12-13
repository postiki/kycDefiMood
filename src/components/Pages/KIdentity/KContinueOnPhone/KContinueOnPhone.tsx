import './KContinueOnPhone.scss'
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import jwt from 'jsonwebtoken'

import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import {stage$, stageDown} from "../../../../entities/progress-manager";

import * as api from '../../../../services/api';
import {useStore} from "effector-react";

interface IKContinueOnPhoneProps {

}

const KContinueOnPhone: React.FC<IKContinueOnPhoneProps> = () => {
    const translation = useTranslation('continue')
    const [url, setUrl] = useState('')
    const stage = useStore(stage$)

    const newUrl = () => {
        const token = jwt.sign({
            info: stage,
            expiresIn: Math.floor(Date.now()) + Number(process.env.REACT_APP_TOKEN_EXP)//1 minute
        }, process.env.REACT_APP_SECRECT_TOKEN || '');

        console.log(`${process.env.REACT_APP_API_QR}/?token=${token}`)

        return setUrl(`${process.env.REACT_APP_API_QR}/?token=${token}&email=${localStorage.getItem('email')}`)
    }

    useEffect(() => {
        newUrl()
    }, [])
    return (
        <div className={'kyc-continue'}>
            <div className={'kyc-continue__wrapper'}>
                <h1>{translation('title')}</h1>
                <div className={'kyc-continue__body'}>
                    <div className={'kyc-continue__body-left'}>
                        <p style={{textAlign: 'left'}}>{'{'}</p>
                        <p style={{textAlign: 'center'}}>{translation('identity')}</p>
                        <p style={{textAlign: 'left'}}>{'}'}</p>
                    </div>
                    <div className={'kyc-continue__body-right'}>
                        <div className={'kyc-continue__body-right-wrapper'}>
                            <h2>{translation('subtitle')}</h2>
                            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>
                                <QRCode
                                    size={256}
                                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                                    value={url}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <h3>{translation('scan')}</h3>
                            <h3 className={'bordered'} onClick={() => newUrl()}>{translation('refresh')}</h3>
                        </div>
                    </div>
                </div>
                <Button
                    handleClick={() => console.log({
                        // 'token': token,
                        // 'encodedString': encodedToken,
                        // 'originalURL': originalURL,
                        // 'encodedURL': encodedURL,
                        // 'decodedURL': decodedURL,
                        // 'decodedString': decodedString,
                    })}
                    title={translation('btnGoBack')}
                    alt
                />
            </div>
        </div>
    )
}

export default KContinueOnPhone;