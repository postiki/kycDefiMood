import './KContinueOnPhone.scss'
import React from "react";
// import jwt from 'jsonwebtoken';
import QRCode from "react-qr-code";

import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import {stageDown} from "../../../../entities/progress-manager";

interface IKContinueOnPhoneProps {

}

const KContinueOnPhone: React.FC<IKContinueOnPhoneProps> = () => {
    const translation = useTranslation('continue')

    // const getToken = () => {
    //     const token = jwt.sign({
    //         username: localStorage.getItem('id'),
    //         expiresIn: process.env.REACT_APP_TOKEN_EXP
    //     }, process.env.REACT_APP_SECRECT_TOKEN || '');
    //
    //     //TODO send to backend
    // }


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
                                    value={'http://192.168.100.2:3000/?token=444'}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <h3>{translation('scan')}</h3>
                        </div>
                    </div>
                </div>
                <Button
                    handleClick={() => stageDown()}
                    title={translation('btnGoBack')}
                    alt
                />
            </div>
        </div>
    )
}

export default KContinueOnPhone