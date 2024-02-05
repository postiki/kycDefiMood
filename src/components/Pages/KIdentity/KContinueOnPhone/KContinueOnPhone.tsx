import './KContinueOnPhone.scss'
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import jwt from 'jsonwebtoken'

import useTranslation from "../../../../hooks/useTranslation";
import {useStore} from "effector-react";
import {userEmail$, userId$, userType$} from "../../../../entities/user";
import PropTypes from "prop-types";

interface IKContinueOnPhoneProps {
    type: string
}

const KContinueOnPhone: React.FC<IKContinueOnPhoneProps> = ({type}) => {
    const translation = useTranslation('continue')
    const [url, setUrl] = useState('')
    const email = useStore(userEmail$)
    const userId = useStore(userId$)
    const userType = useStore(userType$)

    const newUrl = () => {
        console.log(type)
        const token = jwt.sign({
            info: `${type}:${email}:${userId}`,
            expiresIn: Math.floor(Date.now()) + Number(process.env.REACT_APP_TOKEN_EXP)//10 minute
        }, process.env.REACT_APP_SECRECT_TOKEN || '');

        console.log(`http://localhost:3000/?token=${token}&userType=${userType}`)

        return setUrl(`${process.env.REACT_APP_API_QR}/?token=${token}&userType=${userType}`)
    }

    useEffect(() => {
        newUrl()
    }, [])
    return (
        <div className={'kyc-continue'}>
            <div className={'kyc-continue__wrapper'}>
                <div className="kyc-continue__wrapper-title">
                    <p>/person.config.js</p>
                </div>
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

KContinueOnPhone.propTypes ={
    type: PropTypes.string.isRequired
}

export default KContinueOnPhone;