import './KVideoCall.scss'
import React, {useEffect, useState} from "react";
import useTranslation from "../../../hooks/useTranslation";
import Button from "../../UI/Button";
import KCalendar from "./KCalendar/KCalendar";
import Select from "../../UI/Select";

import * as api from '../../../services/api';
import {stageUp, userEmail$} from "../../../entities/progress-manager";
import ModalPage from "../../UI/ModalPage";
import {useStore} from "effector-react";
import {hideLoader, showLoader} from "../../../entities/loader";

interface IKVideoCallProps {

}

const KVideoCall: React.FC<IKVideoCallProps> = () => {
    const translation = useTranslation('schedule')
    const email = useStore(userEmail$)

    const [selectedTime, setSelectedTime] = useState('')
    const [selectedDate, setSelectedDay] = useState('')
    const disabled = !selectedDate || !selectedDate


    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                !disabled && saveDate();
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [disabled]);

    const saveDate = () => {
        try {
            showLoader()
            api.saveSchedule(email, `${selectedDate} ${selectedTime}`).then(r => {
                r.ok && stageUp()
                hideLoader()
            })
        } catch (e) {
            console.error(e)
        }
    }

    const isMobile = window.innerWidth < 1366

    if (isMobile) {
        return (
            <ModalPage>
                <div className={'kyc-schedule'}>
                    <h1>{translation('title')}</h1>
                    <KCalendar onChange={(date) => setSelectedDay(date)}/>
                    <Select
                        onChange={(e) => setSelectedTime(e)}
                        title={translation('timeFromTitle')}
                        points={['10:30 (GMT)', '11:30 (GMT)', '12:30 (GMT)']}
                        icon={'🕑'}
                    />
                    <Button handleClick={() => saveDate()} title={translation('btn')}/>
                </div>
            </ModalPage>
        )
    }

    return (
        <ModalPage>
            <div className={'kyc-schedule'}>
                <h1>{translation('title')}</h1>
                <div className={'kyc-schedule-container'}>
                    <KCalendar onChange={(date) => setSelectedDay(date)}/>
                    <Select
                        onChange={(e) => setSelectedTime(e)}
                        title={translation('timeFromTitle')}
                        points={['10:30 (GMT)', '11:30 (GMT)', '12:30 (GMT)']}
                        icon={'🕑'}
                    />
                </div>
                <Button disabled={disabled} handleClick={saveDate} title={translation('btn')}/>
            </div>
        </ModalPage>
    )
}

export default KVideoCall