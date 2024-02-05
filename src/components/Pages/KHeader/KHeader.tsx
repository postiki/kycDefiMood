import './KHeader.scss';
import React from 'react';
import useTranslation from "../../../hooks/useTranslation";
import ThemeToggle from "../../UI/ThemeToggle";
import WalletConnect from "../../UI/WalletConnect";


interface IKHeaderProps {

}

const KHeader: React.FC<IKHeaderProps> = () => {
    const translation = useTranslation('header')
    const isMobile = window.innerWidth < 1366

    if (isMobile) {
        return (
            <div className="kyc-header">
                <div className="kyc-header-wrapper">
                    <p>{translation('title')}</p>
                    <ThemeToggle/>
                </div>
                <WalletConnect/>
            </div>
        )
    }

    return (
        <div className="kyc-header">
            <p>{translation('title')}</p>
            <div className="kyc-header-wrapper">
                <ThemeToggle/>
                <WalletConnect/>
            </div>
        </div>
    );
}

export default KHeader;
