import './KIdentity.scss'
import React, {useRef, useState} from "react";
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
    const webcamVideo = useRef();

    const typeCamera = doc === 'doc' ? {video: {facingMode: "user"}} : {video: {facingMode: {exact: "environment"}}}

    const startStream = async () => {
        setFile('')
        const stream = await navigator.mediaDevices.getUserMedia({
            ...typeCamera,
            audio: false,
        })
            .then((newStream) => {
                // @ts-ignore
                webcamVideo.current.srcObject = newStream;
                setMediaStream(newStream)
            })

        setPlaying(true)
    };


    const stopStream = () => {
        mediaStream.getTracks().forEach((track: any) => track.stop());
        setPlaying(false)
    };

    const track = mediaStream?.getVideoTracks()[0];

    const grabImage = () => {
        // @ts-ignore
        let imageCapture = new ImageCapture(track)
        imageCapture.takePhoto()
            .then((blob: any) => {
                setPhoto(blob)
                setFile(URL.createObjectURL(blob))
                stopStream()
            })
            .catch((error: any) => console.error(error));

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
                            width: '90%',
                            height: '70%'
                        }}
                        // @ts-ignore
                        ref={webcamVideo}
                        autoPlay
                        playsInline
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
                        // onClick={startStream}
                    >
                        {translation('retake')}
                    </h3>
                }
            </div>
        </ModalPage>
    )
}

export default KIdentity;