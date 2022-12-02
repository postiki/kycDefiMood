import './KMap.scss';
import React from 'react';
import KHeader from "./KHeader";
import KProgressBar from "./KProgressBar";
import KGreetings from "./KGreetings";
import {useStore} from "effector-react";
import {stage$} from "../../entities/progress-manager";
import KPersonal from "./KPersonal";
import KContinueOnPhone from "./KPersonal/KContinueOnPhone";
import {useTheme} from "../../hooks/useThemes";

interface IKPersonalProps {

}

const KMap: React.FC<IKPersonalProps> = () => {
    const stage = useStore(stage$)
    const {theme} = useTheme()
    return (
        <div className="k-map">
            <KHeader/>
            <div className="k-map-body">
                <KProgressBar/>
                {stage === 1 && <KGreetings/>}
                {stage === 2 && <KPersonal/>}
                {/*{stage === 3 && <KContinueOnPhone/>}*/}
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
