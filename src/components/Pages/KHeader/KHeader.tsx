import './KHeader.scss';
import React from 'react';
import useTranslation from "../../../hooks/useTranslation";

interface IKHeaderProps {

}

const KHeader: React.FC<IKHeaderProps> = () =>  {
    const translation = useTranslation('header')

    return (
        <div className="kyc-header">
            <p>{translation('title')}</p>
            <div>svg here</div>
        </div>
    );
}

export default KHeader;
