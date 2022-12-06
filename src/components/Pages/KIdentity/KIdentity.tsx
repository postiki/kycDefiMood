import './KIdentity.scss'
import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import Button from "../../UI/Button";
import KContinueOnPhone from "./KContinueOnPhone";

interface IKIdentifyProps {

}

const KIdentity: React.FC<IKIdentifyProps> = () => {
    const translation = useTranslation('identity')

    const isMobile = window.innerWidth < 1366

    if (!isMobile) {
        return (
            <KContinueOnPhone/>
        )
    }

    return (
        <div className={'kyc-identify'}>
            <h1>{translation('title')}</h1>
            <div className={'kyc-identify-photo'}>
                <Button handleClick={ () => console.log('give access')}/>
            </div>
            <Button handleClick={() => console.log('upload')} title={translation('btn')}/>
            <h3>{translation('retake')}</h3>
        </div>
    )
}

export default KIdentity