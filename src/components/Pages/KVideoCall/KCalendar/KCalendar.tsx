import './KCalendar.scss'
import React, {useEffect, useState} from "react";
import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";

import useTranslation from "../../../../hooks/useTranslation";
import ArrowNext from "../../../SvgIcon/ArrowNext";

interface IKCalendarProps {
    onChange: (date: string) => void
}

const KCalendar: React.FC<IKCalendarProps> = ({onChange}) => {
    const translation = useTranslation('schedule')

    let weekDay = [...moment.weekdaysShort().slice(1), moment.weekdaysShort().slice()[0]]
    const [currentMonth, setCurrentMonth] = useState(0)
    const [rows, setRows] = useState([])
    const [data, setData] = useState(0)
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        setUpCalendar()
        onChange(moment().add({days: data, months: currentMonth}).format('L'))
    }, [data, currentMonth])

    let setUpCalendar = () => {
        let blanks = [];
        for (let i = 0; i < Number(moment().add(currentMonth, 'month').startOf('month').format('d')) - 1; i++) {
            blanks.push(<td key={i + 100} className="calendarDay empty">{""}</td>)
        }
        let daysInMonth = [];
        for (let d = 1; d <= moment().daysInMonth(); d++) {
            if (d.toString() === moment().format('D')) {
                daysInMonth.push(
                    <td
                        key={0 - d}
                        className={d === Number(moment().add(data, 'days').format('D')) ? 'today' : ''}
                        onClick={() => setData(d - new Date().getDate())}
                    >{d}</td>
                );
            } else {
                daysInMonth.push(
                    <td
                        key={0 -d}
                        className={d === Number(moment().add(data, 'days').format('D')) ? 'today' : ''}
                        onClick={() => setData(d - new Date().getDate())}
                    >{d}</td>
                );
            }
        }
        let totalSlots = [...blanks, ...daysInMonth];
        let rows: any = [];
        let cells: any = [];
        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });
        setRows(rows)
    }

    return (
        <div
            className={classNames({
                'kyc-calendar': true,
                'kyc-calendar--open': showCalendar
            })}
        >
            <div
                 className={classNames({
                     'kyc-calendar-preview': true,
                     'kyc-calendar-preview--open': showCalendar
                 })}
                 onClick={() => setShowCalendar(!showCalendar)}
            >
                <p>{translation('pickerTitle')}</p>
                <div>📅</div>
                {`${moment().add(data, 'days').format('Do')} ${moment().add(currentMonth, 'month').format('MMMM')} ${moment().add(currentMonth, 'month').format('YYYY')}`}
                <div className={'kyc-calendar-preview__arrow'}>
                    <ArrowNext/>
                </div>
            </div>
            {showCalendar &&
                <div className='calendar'>
                    <div className='calendar-wrapper'>
                        <div className='navigation'>
                            <div onClick={() => setCurrentMonth(prevState => prevState - 1)}
                                 style={{transform: 'rotate(180deg)'}}>
                                <ArrowNext/>
                            </div>
                            <div>
                                {moment().add(currentMonth, 'month').format('MMMM')}
                                {' '}
                                {moment().add(currentMonth, 'month').format('YYYY')}
                            </div>
                            <div onClick={() => setCurrentMonth(prevState => prevState + 1)}>
                                <ArrowNext/>
                            </div>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                {weekDay.map(days => {
                                    return <th key={days}>{days}</th>
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((d, index) => {
                                return <tr key={index}>{d}</tr>;
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

KCalendar.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default KCalendar;