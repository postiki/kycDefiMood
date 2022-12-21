import './KIdentity.scss'
import React, {useEffect, useRef, useState} from "react";
import useTranslation from "../../../hooks/useTranslation";
import Button from "../../UI/Button";
import KContinueOnPhone from "./KContinueOnPhone";

import * as api from '../../../services/api';
import {stageUp, userEmail$} from "../../../entities/progress-manager";
import ModalPage from "../../UI/ModalPage";
import {useStore} from "effector-react";
import Selfie from "../../SvgIcon/Selfie";
import Doc from "../../SvgIcon/Doc";

interface IKIdentifyProps {
    doc: string
}

const KIdentity: React.FC<IKIdentifyProps> = ({doc}) => {
    const translation = useTranslation('identity')
    const email = useStore(userEmail$)

    const [photo, setPhoto] = useState(null)
    const [file, setFile] = useState('')
    const [playing, setPlaying] = useState(false);
    const [mediaStream, setMediaStream] = useState<any | null>(null);
    const [camWidth, setCamWidth] = useState(0)
    const [camHeight, setCamHeight] = useState(0)
    const webcamVideo = useRef<any>();

    const typeCamera = doc === 'doc' ? {video: {facingMode: {exact: "environment"}}} : {video: {facingMode: "user"}}

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');


    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                !file && handleUpload();
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [file]);

    const startStream = async () => {
        setFile('')
        await navigator.mediaDevices.getUserMedia({
            ...typeCamera,
            audio: false,
        })
            .then((newStream) => {

                if (webcamVideo.current)
                    webcamVideo.current.srcObject = newStream;
                setMediaStream(newStream)

                const settings = newStream.getTracks()[0]?.getSettings()
                setCamWidth(settings.width || 0)
                setCamHeight(settings.height || 0)
            })

        setPlaying(true)
    };


    const stopStream = () => {
        mediaStream.getTracks().forEach((track: any) => track.stop());
        setPlaying(false)
    };

    const grabImage = () => {
        if (context) {
            context.drawImage(webcamVideo.current, 0, 0, camWidth, camHeight);
        }

        if (canvas)
            canvas.toBlob((blob: any) => {
                setFile(URL.createObjectURL(blob))
                setPhoto(blob)
            })

        stopStream()
    }

    const icon = {
        doc: <Doc/>,
        selfie: <Selfie/>
    }
    const handleUpload = () => {
        let formData = new FormData();
        if (photo) {
            formData.append('File', photo, `${doc}:${email}`);

        }
        api.uploadImage(formData, doc).then(r => r.ok && stageUp())
    }

    const isMobile = window.innerWidth < 1366

    if (!isMobile) {
        return (
            <KContinueOnPhone/>
        )
    }

    return (
        <ModalPage>
            <div className={'kyc-identify'}>
                <h1>{translation(`${doc}`)}</h1>
                <div className={'kyc-identify-photo'}>
                    { // @ts-ignore
                        !playing && !file && icon[doc]
                    }

                    <video
                        style={{
                            display: playing ? 'flex' : 'none',
                            width: '100%',
                            height: '100%'
                        }}
                        ref={webcamVideo}
                        autoPlay
                        playsInline
                    />

                    <canvas
                        style={{
                            display: 'none'
                        }}
                        id="canvas"
                        width={camWidth}
                        height={camHeight}
                    />

                    {!playing && !file &&
                        <Button handleClick={startStream} title={'allowBtn'}/>}
                    <div className={'kyc-identify-photo-preview'}
                         style={{
                             display: file ? 'flex' : 'none',
                             backgroundImage: `url(${file})`
                         }}
                    />
                </div>
                {!playing &&
                    <Button disabled={!file} handleClick={handleUpload} title={'upload'}/>
                }
                {!file && playing &&
                    <Button
                        handleClick={() => {
                            grabImage()
                        }}
                        title={'take photo'}
                    />}

                {!playing &&
                    <h3
                        onClick={startStream}
                    >
                        {translation('retake')}
                    </h3>
                }
            </div>
        </ModalPage>
    )
}

export default KIdentity;