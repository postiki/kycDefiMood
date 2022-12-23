import './KContinueOnPhone.scss'
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import jwt from 'jsonwebtoken'

import useTranslation from "../../../../hooks/useTranslation";
import {stage$, userEmail$} from "../../../../entities/progress-manager";
import {useStore} from "effector-react";

interface IKContinueOnPhoneProps {

}

const KContinueOnPhone: React.FC<IKContinueOnPhoneProps> = () => {
    const translation = useTranslation('continue')
    const [url, setUrl] = useState('')
    const stage = useStore(stage$)
    const email = useStore(userEmail$)

    const newUrl = () => {
        const token = jwt.sign({
            info: `${stage}_${email}`,
            expiresIn: Math.floor(Date.now()) + Number(process.env.REACT_APP_TOKEN_EXP)//10 minute
        }, process.env.REACT_APP_SECRECT_TOKEN || '');

        // console.log(`http://localhost:3000/?token=${token}`)

        return setUrl(`${process.env.REACT_APP_API_QR}/?token=${token}`)
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
                            <div style={{height: "auto", margin: "0 auto", maxWidth: 100, width: "100%"}}>
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
            </div>
        </div>
    )
}

export default KContinueOnPhone;