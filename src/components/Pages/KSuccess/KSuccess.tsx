import './KSuccess.scss'
import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import Button from "../../UI/Button";
import ModalPage from "../../UI/ModalPage";

interface IKSuccessProps {

}

const KSuccess: React.FC<IKSuccessProps> = () => {
    const translation = useTranslation('success')
    const isMobile = window.innerWidth < 1366
    return (
        <ModalPage>
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
                    {translation(`${isMobile ? 'completeMobile' : 'complete'}`)}
                            {isMobile &&
                                <>
                                    <br/>
                                    ヽ(・∀・)ﾉ
                                </>
                            }
                    </span>
                        <p>)</p>
                    </div>
                    <Button handleClick={() => console.log('success')} title={translation('btn')}/>
                </div>
            </div>
        </ModalPage>
    )
}

export default KSuccess;