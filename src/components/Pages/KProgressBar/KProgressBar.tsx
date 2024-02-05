import './KProgressBar.scss';
import React, {useEffect, useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";

import classNames from "classnames";
import PropTypes from "prop-types";
import {useStore} from "effector-react";
import {modal$} from "../../../entities/modals";
import {controller} from "../../../entities/KYC/controller";

const stagesTranslations: any = {
    EMAIL_VERIFY: 'start',
    WALLET_CONNECT: 'wallet',
    PERSONAL: 'personal',
    PROJECT: 'project',
    IDENTIFY_DOC: 'doc',
    IDENTIFY_SELFIE: 'selfie',
    INTERVIEW: 'interview',
    SUCCESS: 'success',
}

interface IKProgressBarProps {
    isExpired: boolean
}

const KProgressBar: React.FC<IKProgressBarProps> = ({isExpired}) => {
    const translation = useTranslation('progressbar')
    const currentStage = useStore(modal$)
    const srcStep = useStore(controller)
    const currentStageIndex = Object.keys(srcStep?.states || []).indexOf(currentStage)
    const isMobile = window.innerWidth < 1366

    const [testSteps, setTestSteps] = useState({})

    useEffect(() => {
        if (srcStep) {
            setTestSteps(srcStep.states)
        }
    }, [srcStep])


    if (isExpired) {
        return (
            <div className="kyc-progressbar-mobile">
                <p>{translation('error')}</p>
            </div>
        )
    }

    if (isMobile && srcStep) {
        return (
            <div className="kyc-progressbar-mobile">
                <h1>Step {currentStageIndex + 2}/{Object.keys(srcStep?.states).length}:
                    <span> {translation(`${stagesTranslations[currentStage]}`)}</span>
                </h1>
            </div>
        )
    }


    return (
        <div className="kyc-progressbar"
             style={{
                 display: !testSteps ? 'none' : "flex"
             }}
        >
            {testSteps && Object.keys(testSteps).sort((a: any, b: any) => {
                if (a === 'INITIAL') return -1;
                if (b === 'INITIAL') return 1;
                return 0;
            }).map((i, index) => {

                    const parsedItem = i === 'INITIAL' ? 'EMAIL_VERIFY' : i
                    return (
                        <>
                            <div className={'kyc-progressbar-item'}>
                                <div className={'kyc-progressbar-item-box'}>
                                    {currentStageIndex + 1 > index &&
                                        <div className={'kyc-progressbar-item-box-check'}/>}
                                </div>
                                <div className={classNames({
                                    'kyc-progressbar-item-label': true,
                                    'kyc-progressbar-item-label--active': currentStageIndex + 1 === index
                                })}
                                >
                                    <p>{translation(`${stagesTranslations[parsedItem]}`)}</p>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: index + 1 === Object.keys(testSteps).length ? 'none' : 'flex'
                                }}
                                className={'kyc-progressbar-line'}
                            />
                        </>
                    )
                }
            )}
        </div>
    );
}

KProgressBar.propTypes = {
    isExpired: PropTypes.bool.isRequired
}

export default KProgressBar;
