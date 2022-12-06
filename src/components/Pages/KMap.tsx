import './KMap.scss';
import React, {useEffect} from 'react';
import KHeader from "./KHeader";
import KProgressBar from "./KProgressBar";
import {useStore} from "effector-react";
import {setStage, stage$, stageUp} from "../../entities/progress-manager";

import {useTheme} from "../../hooks/useThemes";
import KIdentity from "./KIdentity";
import KGreetings from "./KGreetings";
import KPersonal from "./KPersonal";

import * as api from '../../services/api'
import jwt from "jsonwebtoken";
import {useJwt} from "react-jwt";

interface token {
    expiresIn: string
}

interface IKPersonalProps {

}

const KMap: React.FC<IKPersonalProps> = () => {
    const stage = useStore(stage$)
    const {theme} = useTheme()
    const queryParameters = new URLSearchParams(window.location.search)
    const token = queryParameters.get("token")

    const {decodedToken, reEvaluateToken} = useJwt(token || '');

    useEffect(() => {
        console.log({
            'date now': new Date(),// @ts-ignore
            'expiresIn': new Date(decodedToken?.expiresIn),// @ts-ignore
            'isExpired': new Date() > new Date(decodedToken?.expiresIn || null),// @ts-ignore
            'token': token
        })

        // @ts-ignore
        let isExpired = new Date() > new Date(decodedToken?.expiresIn || null)

        if (!isExpired) {
            setStage(3)
        }
    }, [decodedToken, token])


    return (
        <div className="k-map">
            <KHeader/>
            <div className="k-map-body">
                <KProgressBar/>
                {stage === 1 && <KGreetings/>}
                {stage === 2 && <KPersonal/>}
                {stage === 3 && <KIdentity/>}
            </div>
            <div className="k-map-footer">
                <div
                    className={'k-map-footer-logo'}
                >
                    <video
                        autoPlay
                        muted
                        loop
                        id="myVideo"
                        src={`/video/${theme}.mp4`}
                    />
                </div>
                <p>Powered by <span>defimoon</span></p>
            </div>
        </div>
    );
}

export default KMap;
