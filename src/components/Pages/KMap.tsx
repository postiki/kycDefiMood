import './KMap.scss';
import React from 'react';
import KHeader from "./KHeader";
import KProgressBar from "./KProgressBar";
import KGreetings from "./KGreetings";
import {useStore} from "effector-react";
import {stage$} from "../../entities/progress-manager";
import KPersonal from "./KPersonal";
import KContinueOnPhone from "./KContinueOnPhone";

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
                {stage === 3 && <KContinueOnPhone/>}
            </div>
            <div className="k-map-footer">
                <iframe
                    title={'logoAnimation'}
                    src='https://my.spline.design/untitled-face9c72c891169cc43185676a5f35f0/'
                    width='100%' height='100%'
                    frameBorder={0}
                />
                <p>Powered by <span>defimoon</span></p>
            </div>
        </div>
    );
}

export default KMap;
