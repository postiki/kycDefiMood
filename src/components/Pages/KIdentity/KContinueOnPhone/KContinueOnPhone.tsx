import './KContinueOnPhone.scss'
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import jwt from 'jsonwebtoken'

import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import {stageDown} from "../../../../entities/progress-manager";

import * as api from '../../../../services/api';

interface IKContinueOnPhoneProps {

}

const KContinueOnPhone: React.FC<IKContinueOnPhoneProps> = () => {
    const translation = useTranslation('continue')
    const [url, setUrl] = useState('')

    const newUrl = () => {
        const token = jwt.sign({
            info: 'someinfo',
            // expiresIn:  Math.floor(Date.now() / 1000) - Number(process.env.REACT_APP_TOKEN_EXP)
            expiresIn:  Math.floor(Date.now()) + Number(process.env.REACT_APP_TOKEN_EXP)//1 minute
        }, process.env.REACT_APP_SECRECT_TOKEN || '');

        console.log(`http://192.168.100.2:3000/?token=${token}`, process.env.REACT_APP_TOKEN_EXP, process.env.REACT_APP_SECRECT_TOKEN)

        return setUrl(`http://192.168.100.2:3000/?token=${token}`)
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
                            <h3 onClick={() => newUrl()}>{translation('scan')}</h3>
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