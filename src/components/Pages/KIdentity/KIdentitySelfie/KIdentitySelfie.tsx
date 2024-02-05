import './KIdentitySelfie.scss'
import React, {useEffect, useRef, useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import {userId$} from "../../../../entities/user";
import {useStore} from "effector-react";
import {hideLoader, showLoader} from "../../../../entities/loader";
import KContinueOnPhone from "../KContinueOnPhone";
import ModalPage from "../../../UI/ModalPage";
import Button from "../../../UI/Button";
import * as api from '../../../../services/api';
import Selfie from "../../../SvgIcon/Selfie";
import {performTransition} from "../../../../entities/KYC/controller";


interface IKIdentitySelfieProps {
}

const KIdentitySelfie: React.FC<IKIdentitySelfieProps> = () => {
    const translation = useTranslation('identity')
    const userId = useStore(userId$)

    const [photo, setPhoto] = useState(null)
    const [file, setFile] = useState('')
    const [playing, setPlaying] = useState(false);
    const [mediaStream, setMediaStream] = useState<any | null>(null);
    const [camWidth, setCamWidth] = useState(0)
    const [camHeight, setCamHeight] = useState(0)
    const webcamVideo = useRef<any>();

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    //TODO remove to effector

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
            video: {facingMode: "user"},
            audio: false,
        })
            .then((newStream) => {

                if (webcamVideo.current)
                    webcamVideo.current.srcObject = newStream;
                setMediaStream(newStream)

                const settings = newStream.getTracks()[0]?.getCapabilities()
                if (settings.width && settings.height) {
                    setCamHeight(settings.width.max || 0)
                    setCamWidth(settings.height.max || 0)
                }
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

    const handleUpload = () => {
        let formData = new FormData();
        if (photo) {
            formData.append('File', photo, `selfie:${userId}`);
        }
        showLoader()
        api.uploadImage(formData, 'selfie').then(r => {
            r.ok && performTransition('next')
            hideLoader()
        })
    }

    const isMobile = window.innerWidth < 1366

    if (!isMobile) {
        return (
            <KContinueOnPhone type={'selfie'}/>
        )
    }

    return (
        <ModalPage>
            <div className={'kyc-identify'}>
                <div className="kyc-identify-title">
                    <p>/person.config.js</p>
                </div>
                <h1>{translation(`selfie`)}</h1>
                <div className={'kyc-identify-photo'}>
                    { // @ts-ignore
                        !playing && !file && <Selfie/>
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
                        title={translation('take')}
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

KIdentitySelfie.propTypes = {}

export default KIdentitySelfie;