import './KProgressBar.scss';
import React from 'react';
import useTranslation from "../../../hooks/useTranslation";
import {useStore} from "effector-react";
import {stage$} from "../../../entities/progress-manager";
import classNames from "classnames";

const stages = {
    0: 'start',
    1: 'personal',
    2: 'identity',
    3: 'identity',
    4: 'selfie',
    5: 'schedule',
    6: 'success',
}

interface IKProgressBarProps {

}

const KProgressBar: React.FC<IKProgressBarProps> = () => {
    const translation = useTranslation('progressbar')
    const stage = useStore(stage$)

    const isMobile = window.innerWidth < 1366

    // @ts-ignore
    const stageName = stages[stage]

    if (isMobile) {
        return (
            <div className="kyc-progressbar-mobile">
                <h1>Step {stage}/6:
                    <span>{translation(`${stageName}`)}</span>
                </h1>
            </div>
        )
    }

    return (
        <div className="kyc-progressbar">
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {stage > 0 && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': stage > 0
                })}
                >
                    <p>{translation('start')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {stage > 1 && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': stage > 1
                })}
                >
                    <p>{translation('personal')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {stage > 2 && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': stage > 2
                })}
                >
                    <p>{translation('identity')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {stage > 3 && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': stage > 3
                })}
                >
                    <p>{translation('selfie')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {stage > 4 && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': stage > 4
                })}
                >
                    <p>{translation('schedule')}</p>
                </div>
            </div>
            <div className={'kyc-progressbar-line'}/>
            <div className={'kyc-progressbar-item'}>
                <div className={'kyc-progressbar-item-box'}>
                    {stage > 5 && <div className={'kyc-progressbar-item-box-check'}/>}
                </div>
                <div className={classNames({
                    'kyc-progressbar-item-label': true,
                    'kyc-progressbar-item-label--active': stage > 5
                })}
                >
                    <p>{translation('success')}</p>
                </div>
            </div>
        </div>
    );
}

export default KProgressBar;
