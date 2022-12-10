import './KIdentity.scss'
import React, {useState} from "react";
import useTranslation from "../../../hooks/useTranslation";
import Button from "../../UI/Button";
import KContinueOnPhone from "./KContinueOnPhone";

import * as api from '../../../services/api';
import {stageUp} from "../../../entities/progress-manager";

interface IKIdentifyProps {
    doc: string
}

const KIdentity: React.FC<IKIdentifyProps> = ({doc}) => {
    const translation = useTranslation('identity')
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [src, setSrc] = useState('')

    //TODO add ts types

    // @ts-ignore
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setSrc(URL.createObjectURL(event.target.files[0]))
        setIsFilePicked(true);
    };

    const handleUpload = () => {
        let formData = new FormData();
        const file = selectedFile;
        if (file) {
            formData.append('File', file, `${doc}_${localStorage.getItem('email')}`);
        }
        api.uploadImage(formData, doc).then(r => r.ok && stageUp())
    }

    const handleRetake = () => {
        setSelectedFile(null)
    }

    const isMobile = window.innerWidth < 1366

    if (!isMobile) {
        return (
            <KContinueOnPhone/>
        )
    }

    return (
        <div className={'kyc-identify'}>
            <h1>{translation('title')}</h1>
            <div className={'kyc-identify-photo'}>
                {!selectedFile &&
                    <div
                        style={{
                            width: '100%',
                            height: '55%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            type="file"
                            name="file"
                            accept="image/*;capture=camera"
                            // @ts-ignore
                            capture="camera"
                            onChange={changeHandler}
                        />
                        {/*<Button handleClick={() => console.log('')} title={translation('allowBtn')}/>*/}
                        {/*<p>{translation('access')}</p>*/}
                    </div>
                }
                {selectedFile &&
                    <div className={'kyc-identify-photo-preview'}
                         style={{
                             backgroundImage: `url(${src})`
                         }}
                    />
                }
                {/*{selectedFile && <div className={'kyc-identify-photo-preview-capture'}></div>}*/}
            </div>
            <Button handleClick={handleUpload} title={translation('btn')}/>
            <h3 onClick={handleRetake}>{translation('retake')}</h3>
        </div>
    )
}

export default KIdentity