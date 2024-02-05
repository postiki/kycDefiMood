import './KMap.scss';
import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import KHeader from "./KHeader";
import KProgressBar from "./KProgressBar";
import {useStore} from "effector-react";

import KPersonalInfo from "./KPersonalInfo";
import KVideoCall from "./KVideoCall/KVideoCall";
import KSuccess from "./KSuccess";
import Loader from "../UI/Loader";
import {processing$, showingLoader$} from "../../entities/loader";
import {modal$, showModal} from "../../entities/modals";
import modalTypes from "../../entities/modals/modalTypes";
import Button from "../UI/Button";
import KIdentityDoc from "./KIdentity/KIdentityDoc";
import KIdentitySelfie from "./KIdentity/KIdentitySelfie";
import ModalPage from "../UI/ModalPage";
import useTranslation from "../../hooks/useTranslation";
import KGreetingsEmailVerify from "./KGreetings/KGreetingsEmailVerify";
import KGreetingsReferral from "./KGreetings/KGreetingsReferral";
import KGreetingsComplete from "./KGreetings/KGreetingsComplete";
import KGreetingWallet from "./KGreetings/KGreetingsWallet";
import KProjectInfo from "./KProjectInfo";
import {initConfig, performTransition} from "../../entities/KYC/controller";
import jwt from "jsonwebtoken";

interface IKPersonalProps {

}

const KMap: React.FC<IKPersonalProps> = () => {
    const modal = useStore(modal$)
    const showingLoader = useStore(showingLoader$);
    const processing = useStore(processing$);
    const translation = useTranslation('map')

    const [expired, setExpired] = useState(false)
    const [showDebug, setShowDebug] = useState(false)
    const debugMode = process.env.REACT_APP_DEBUG_MODE === 'true';

    const queryParameters = new URLSearchParams(window.location.search)


    const flowType = queryParameters.get("userType")
    const queryParametersFallback = /owner|integration/.test(flowType || '')
    const config = queryParametersFallback ? flowType : 'integration'

    const fnAuth = async () => {
        try {
            const token = await queryParameters.get("token")
            if (token) {
                const decodedToken = jwt.verify(token || '', process.env.REACT_APP_SECRECT_TOKEN || '')
                initConfig({config, decodedToken})
            } else {
                initConfig({config})
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fnAuth()
    }, [])

    if (expired) {
        return (
            <ModalPage>
                <div className="kyc-greetings-mobile">
                    <h1 className={'mobile'}>{translation('tokenExpired')}</h1>
                </div>
            </ModalPage>
        )
    }

    return (
        <div className={classNames({
            'k-map': true,
            'k-map--loading': showingLoader || processing
        })}>
            {(showingLoader || processing) && <Loader/>}
            <KHeader/>
            <div className="k-map-body">
                <KProgressBar isExpired={expired}/>


                {modal === modalTypes.WALLET_CONNECT && <KGreetingWallet/>}
                {modal === modalTypes.EMAIL_VERIFY && <KGreetingsEmailVerify/>}
                {modal === modalTypes.GREETINGS_SUCCESS && <KGreetingsComplete/>}
                {modal === modalTypes.REFERRAL && <KGreetingsReferral/>}
                {modal === modalTypes.PERSONAL && <KPersonalInfo/>}
                {modal === modalTypes.PROJECT && <KProjectInfo/>}
                {modal === modalTypes.IDENTIFY_DOC && <KIdentityDoc/>}
                {modal === modalTypes.IDENTIFY_SELFIE && <KIdentitySelfie/>}
                {modal === modalTypes.INTERVIEW && <KVideoCall/>}
                {modal === modalTypes.SUCCESS && <KSuccess/>}


                {debugMode &&
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 50,
                        }}

                    >
                        <Button handleClick={() => performTransition('next')} title={'debug'}/>
                    </div>
                }

                {debugMode && showDebug &&
                    <div className={'debug'}>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.WALLET_CONNECT)}
                        >
                            wallet
                        </div>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.EMAIL_VERIFY)}
                        >
                            email
                        </div>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.GREETINGS_SUCCESS)}
                        >
                            GComplete
                        </div>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.REFERRAL)}
                        >
                            referral
                        </div>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.PERSONAL)}
                        >
                            personal
                        </div>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.IDENTIFY_DOC)}
                        >
                            doc
                        </div>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.IDENTIFY_SELFIE)}
                        >
                            self
                        </div>
                        <div
                            className={'debug-item'}
                            onClick={() => showModal(modalTypes.INTERVIEW)}
                        >
                            call
                        </div>
                    </div>
                }
            </div>
            <div className="k-map-footer">
                <div className={'k-map-footer-logo'}/>
                <p>Powered by <span onClick={() => window.open('https://defimoon.org')}>defimoon</span></p>
            </div>
        </div>
    );
}

export default KMap;
