import './KIdentityDoc.scss'
import React, {useEffect, useRef, useState} from "react";
import {useStore} from "effector-react";
import useTranslation from "../../../../hooks/useTranslation";
import {userId$} from "../../../../entities/user";
import Doc from "../../../SvgIcon/Doc";
import ModalPage from "../../../UI/ModalPage";
import KContinueOnPhone from "../KContinueOnPhone";
import {hideLoader, showLoader} from "../../../../entities/loader";
import * as api from '../../../../services/api';
import Button from "../../../UI/Button";
import {performTransition} from "../../../../entities/KYC/controller";

interface IKIdentityDocProps {
}

const KIdentityDoc: React.FC<IKIdentityDocProps> = () => {
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
            video: {facingMode: {exact: "environment"}},
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
            formData.append('File', photo, `doc:${userId}`);
        }
        showLoader()
        api.uploadImage(formData, 'doc').then(r => {
            r.ok && performTransition('next')
            hideLoader()
        })
    }

    const isMobile = window.innerWidth < 1366

    if (!isMobile) {
        return (
            <KContinueOnPhone type={'doc'}/>
        )
    }

    return (
        <ModalPage>
            <div className={'kyc-identify-doc'}>
                <div className="kyc-identify-doc-title">
                    <p>/person.config.js</p>
                </div>
                <h1>{translation(`doc`)}</h1>
                <div className={'kyc-identify-photo'}>
                    { // @ts-ignore
                        !playing && !file && <Doc/>
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

KIdentityDoc.propTypes = {}

export default KIdentityDoc;