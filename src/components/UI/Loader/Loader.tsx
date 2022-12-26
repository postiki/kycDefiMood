import './Loader.scss'
import React from "react";

interface ISelectorProps {

}

const Loader: React.FC<ISelectorProps> = () => {
    return (
        <div className={'kyc-loader'} id={'loader'}>
            <div className={'kyc-loader--wrapper'}>
                <div className={'kyc-loader-spin'}>

                </div>
                <p>Loading...</p>
            </div>
        </div>
    )
}

Loader.propTypes = {}

export default Loader;