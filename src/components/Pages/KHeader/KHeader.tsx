import './KHeader.scss';
import React from 'react';
import useTranslation from "../../../hooks/useTranslation";
import DarkMode from "../../SvgIcon/ThemaIcon";

interface IKHeaderProps {

}

const KHeader: React.FC<IKHeaderProps> = () => {
    const translation = useTranslation('header')

    return (
        <div className="kyc-header">
            <p>{translation('title')}</p>
            <DarkMode/>
        </div>
    );
}

export default KHeader;
