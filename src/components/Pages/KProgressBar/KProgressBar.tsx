import './KProgressBar.scss';
import React from 'react';
import useTranslation from "../../../hooks/useTranslation";

interface IKProgressBarProps {

}

const KProgressBar: React.FC<IKProgressBarProps> = () => {
    const translation = useTranslation('progressbar')

    return (
        <div className="kyc-progressbar">
            <p>progress</p>
        </div>
    );
}

export default KProgressBar;
