import './KContinueOnPhone.scss'
import React from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import {stageDown} from "../../../../entities/progress-manager";

interface IKContinueOnPhoneProps {

}

const KContinueOnPhone: React.FC<IKContinueOnPhoneProps> = () => {
    const translation = useTranslation('continue')
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
                            qr will be here
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