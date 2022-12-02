import './KHeader.scss';
import React from 'react';
import useTranslation from "../../../hooks/useTranslation";
import KThemeToggle from "../KThemeToggle";


interface IKHeaderProps {

}

const KHeader: React.FC<IKHeaderProps> = () => {
    const translation = useTranslation('header')

    return (
        <div className="kyc-header">
            <p>{translation('title')}</p>
            <KThemeToggle/>
        </div>
    );
}

export default KHeader;
