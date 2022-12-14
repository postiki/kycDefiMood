import './KMap.scss';
import React, {useEffect, useState} from 'react';
import KHeader from "./KHeader";
import KProgressBar from "./KProgressBar";
import {useStore} from "effector-react";
import {useJwt} from "react-jwt";

import {addUserEmail, setStage, stage$, userEmail$} from "../../entities/progress-manager";

import {useTheme} from "../../hooks/useThemes";
import KIdentity from "./KIdentity";
import KGreetings from "./KGreetings";
import KPersonal from "./KPersonal";
import KVideoCall from "./KVideoCall/KVideoCall";
import KSuccess from "./KSuccess";

interface IToken {
    expiresIn: string
    info: string
}

interface IKPersonalProps {

}

const KMap: React.FC<IKPersonalProps> = () => {
    const stage = useStore(stage$)
    const queryParameters = new URLSearchParams(window.location.search)
    const token = queryParameters.get("token")
    const {decodedToken} = useJwt(token || '');

    //TODO remove all ts ignore
    useEffect(() => {
        if (decodedToken) {
            // @ts-ignore
            const splitMsg = (decodedToken.info).split('_')
            addUserEmail(splitMsg[1])

            // @ts-ignore
            let isExpired = new Date() > new Date(decodedToken.expiresIn)

            if (decodedToken && !isExpired) {

                setStage(splitMsg[0])
            }
        }
    }, [decodedToken, token])

    return (
        <div className="k-map">
            <KHeader/>
            <div className="k-map-body">
                <KProgressBar/>
                {/*{stage === 1 && <KVideoCall/>}*/}
                {/*{stage === 1 && <KIdentity doc={'doc'}/>}*/}
                {/*{stage === 1 && <KSuccess/>}*/}
                {/*{stage === 1 && <KSuccess/>}*/}

                {stage === 1 && <KGreetings/>}
                {stage === 2 && <KPersonal/>}
                {stage === 3 && <KIdentity doc={'doc'}/>}
                {stage === 4 && <KIdentity doc={'selfie'}/>}
                {stage === 5 && <KVideoCall/>}
                {stage === 6 && <KSuccess/>}
            </div>
            <div className="k-map-footer">
                <div
                    className={'k-map-footer-logo'}
                />
                <p>Powered by <span>defimoon</span></p>
            </div>
        </div>
    );
}

export default KMap;
