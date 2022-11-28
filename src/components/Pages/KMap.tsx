import './KMap.scss';
import React from 'react';
import KHeader from "./KHeader";
import KProgressBar from "./KProgressBar";
import KGreetings from "./KGreetings";
import {useStore} from "effector-react";
import {stage$} from "../../entities/progress-manager";
import KPersonal from "./KPersonal";

interface IKMapProps {

}

const KMap: React.FC<IKMapProps> = () => {
    const stage = useStore(stage$)
    return (
        <div className="k-map">
            <KHeader/>
            <div className="k-map-body">
                <KProgressBar/>
                {stage === 1 && <KGreetings/>}
                {stage === 2 && <KPersonal/>}
            </div>
        </div>
    );
}

export default KMap;
