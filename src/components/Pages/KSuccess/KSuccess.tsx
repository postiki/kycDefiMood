import './KSuccess.scss'
import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import Button from "../../UI/Button";

interface IKSuccessProps {

}

const KSuccess: React.FC<IKSuccessProps> = () => {
    const translation = useTranslation('success')
    return (
        <div className={'kyc-success'}>
            <div className={'kyc-success__wrapper'}>
                <h1>{translation('title')}</h1>
                <div className={'kyc-success__input'}>
                    <p>Input(</p>
                    <span>
                        Personal_info;
                        <br/>
                        Passport_photo;
                        <br/>
                        Selfie;
                        <br/>
                    </span>
                    <p>)</p>
                </div>
                <div className={'kyc-success__output'}>
                    <p>Output(</p>
                    <span>
                    {translation('complete')}
                    </span>
                    <p>)</p>
                </div>
                <Button handleClick={() => console.log('success')} title={translation('btn')}/>
            </div>
        </div>
    )
}

export default KSuccess;