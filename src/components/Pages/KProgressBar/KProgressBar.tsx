import './KProgressBar.scss';
import React, {useEffect, useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import {useStore} from "effector-react";
import {stage$} from "../../../entities/progress-manager";
import classNames from "classnames";

interface IKProgressBarProps {

}

const KProgressBar: React.FC<IKProgressBarProps> = () => {
    const translation = useTranslation('progressbar')
    const stage = useStore(stage$)

    const [separatedStage, setSeparatedStage] = useState({
        start: true,
        personal: false,
        identity: false,
        selfie: false,
        success: false
    })

    useEffect(() => {
        switch (stage) {
            case 2:
                setSeparatedStage(prevState => ({...prevState, personal: true}))
                break;
            case 3:
                setSeparatedStage(prevState => ({...prevState, identity: true}))
                break;
            case 4:
                setSeparatedStage(prevState => ({...prevState, selfie: true}))
                break;
            case 5:
                setSeparatedStage(prevState => ({...prevState, success: true}))
                break;
        }
    }, [stage])

    return (
        <div className="kyc-progressbar">
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {separatedStage.start && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': separatedStage.start
                })}
                >
                    <p>{translation('start')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {separatedStage.personal && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': separatedStage.personal
                })}
                >
                    <p>{translation('personal')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {separatedStage.identity && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': separatedStage.identity
                })}
                >
                    <p>{translation('identity')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {separatedStage.selfie && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': separatedStage.selfie
                })}
                >
                    <p>{translation('selfie')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {separatedStage.success && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': separatedStage.success
                })}
                >
                    <p>{translation('success')}</p>
                </div>
            </div>
        </div>
    );
}

export default KProgressBar;
