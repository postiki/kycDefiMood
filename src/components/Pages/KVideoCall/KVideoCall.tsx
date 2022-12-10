import './KVideoCall.scss'
import React, {useState} from "react";
import useTranslation from "../../../hooks/useTranslation";
import Button from "../../UI/Button";
import KCalendar from "./KCalendar/KCalendar";
import Select from "../../UI/Select";

import * as api from '../../../services/api';
import {stageUp} from "../../../entities/progress-manager";

interface IKVideoCallProps {

}

const KVideoCall: React.FC<IKVideoCallProps> = () => {
    const translation = useTranslation('schedule')
    const [selectedTime, setSelectedTime] = useState('')
    const [selectedDate, setSelectedDay] = useState('')

    const saveDate = () => {
        try {
            api.saveSchedule(localStorage.getItem('email'), `${selectedDate} ${selectedTime}`).then(r => r.ok && stageUp())
        } catch (e) {
            console.error(e)
        }
    }

    const isMobile = window.innerWidth < 1366

    if (isMobile) {
        return (
            <div className={'kyc-schedule'}>
                <div className={'kyc-schedule-wrapper'}>
                    <h1>{translation('title')}</h1>
                    <KCalendar onChange={(date) => setSelectedDay(date)}/>
                    <Select
                        onChange={(e) => setSelectedTime(e)}
                        title={translation('timeFromTitle')}
                        points={['10:30 (GMT+3)', '11:30 (GMT+3)', '12:30 (GMT+3)']}
                    />
                    <Button handleClick={() => saveDate()} title={translation('btn')}/>
                </div>
            </div>
        )
    }

    return (
        <div className={'kyc-schedule'}>
            <h1>{translation('title')}</h1>
            <div className={'kyc-schedule-container'}>
                <KCalendar onChange={(date) => setSelectedDay(date)}/>
                <Select
                    onChange={(e) => setSelectedTime(e)}
                    title={translation('timeFromTitle')}
                    points={['10:30 (GMT+3)', '11:30 (GMT+3)', '12:30 (GMT+3)']}
                />
            </div>
            <Button handleClick={() => saveDate()} title={translation('btn')}/>
        </div>
    )
}

export default KVideoCall