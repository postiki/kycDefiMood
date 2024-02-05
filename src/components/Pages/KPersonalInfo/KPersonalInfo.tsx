import './KPersonalInfo.scss';
import React, {useEffect, useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import Form from "../../UI/Form";
import Select from "../../UI/Select";
import Button from "../../UI/Button";

import country from '../../../data/country.json'
import SelectCountry from "../../UI/SelectCountry";

import ModalPage from "../../UI/ModalPage";
import {useDebounce} from "react-use";
import {savePersonalInfo} from "../../../entities/KYC/personal";
import {useStore} from "effector-react";
import {ownerAddr$} from "../../../entities/user";

interface IKPersonalProps {

}

const KPersonalInfo: React.FC<IKPersonalProps> = () => {
    const translation = useTranslation('personal')
    const ownerAddr = useStore(ownerAddr$)

    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [citizenship, setCitizenship] = useState<string>('')
    const [residence, setResidence] = useState<string>('')
    const [docType, setDocType] = useState<string>('')
    const [docNumber, setDocNumber] = useState<string>('')

    const [disabledBtn, setDisabledBtn] = useState(true)
    const [error, setError] = useState({
        name: '',
        date: '',
        docNumber: '',
    })

    const disabled = !name || !date || !citizenship || !residence || !docType || !docNumber

    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                !disabledBtn && handleComplete();
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [disabledBtn]);

    const regExFullName = /^[a-zA-Z ]*$/;
    const validName = (regExFullName.test(name || '') || name === '');

    const regExPDesc = /^[a-zA-Z0-9 ]*$/;
    const validDocNumb = (regExPDesc.test(docNumber || '') || docNumber === '');

    const regExDate = /(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)/
    const invalidDate = (regExDate.test(date || '') || date === '');

    useDebounce(
        () => {
            if (name && !validName) {
                setError(prevState => ({...prevState, name: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, name: ''}))
            }

            if (date) {
                const dateNow = new Date()
                const year = dateNow.getFullYear()
                const splitDate = date.split('/')

                const trueDate = Number(splitDate[2]) <= year

                if (date && (!invalidDate || !trueDate)) {
                    setError(prevState => ({...prevState, date: 'error'}))
                    setDisabledBtn(true)
                    return
                } else {
                    setError(prevState => ({...prevState, date: ''}))
                }
            }

            if (docNumber && !validDocNumb) {
                setError(prevState => ({...prevState, docNumber: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, docNumber: ''}))
            }

            setDisabledBtn(false)
        },
        200,
        [name, date, docNumber]
    );

    const handleComplete = () => {
        const info = {
            name: name,
            date: date,
            citizenship: citizenship,
            residence: residence,
            docType: docType,
            docNumber: docNumber,
            addr: ownerAddr
        }
        savePersonalInfo(info)
    }

    useEffect(() => {
        setName(localStorage.getItem('name') || '')
        setDate(localStorage.getItem('date') || '')
        setCitizenship(localStorage.getItem('citizenship') || '')
        setResidence(localStorage.getItem('residence') || '')
        setDocType(localStorage.getItem('docType') || '')
        setDocNumber(localStorage.getItem('docNumber') || '')
    }, [])

    const isMobile = window.innerWidth < 1366

    return (
        <ModalPage>
            <div className="kyc-personal">
                <div className="kyc-personal-title">
                    <p>/.env</p>
                </div>
                <h1>{translation('title')}</h1>
                <div className="kyc-personal-firstRow">
                    <Form
                        onChange={(e) => {
                            setName(e.target.value)
                            localStorage.setItem('name', e.target.value)
                        }}
                        title={translation('formNameTitle')}
                        placeHolder={translation('formNamePlaceHolder')}
                        value={name}
                        error={error.name}
                    />
                    {!isMobile &&
                        <Form
                            onChange={(e) => {
                                setDate(e.target.value)
                                localStorage.setItem('date', e.target.value)
                            }}
                            title={translation('formDateTitle')}
                            placeHolder={translation('formDatePlaceHolder')}
                            value={date}
                            mask={'99/99/9999'}
                            error={error.date}
                        />
                    }
                </div>
                {isMobile &&
                    <Form
                        onChange={(e) => {
                            setDate(e.target.value)
                            localStorage.setItem('date', e.target.value)
                        }}
                        title={translation('formDateTitle')}
                        placeHolder={translation('formDatePlaceHolder')}
                        value={date}
                        mask={'99/99/9999'}
                        error={error.date}
                    />
                }
                <div className="kyc-personal-secondRow">
                    <SelectCountry
                        onChange={(props) => {
                            setCitizenship(props)
                            localStorage.setItem('citizenship', props)
                        }}
                        title={translation('selectCitizenshipTitle')}
                        points={country}
                    />
                    {!isMobile &&
                        <SelectCountry
                            onChange={(props) => {
                                setResidence(props)
                                localStorage.setItem('residence', props)
                            }}
                            title={translation('selectResidenceTitle')}
                            points={country}
                        />
                    }
                </div>
                {isMobile &&
                    <SelectCountry
                        onChange={(props) => {
                            setResidence(props)
                            localStorage.setItem('residence', props)
                        }}
                        title={translation('selectResidenceTitle')}
                        points={country}
                    />
                }
                <div className="kyc-personal-thirdRow">
                    <Select
                        onChange={(props) => {
                            setDocType(props)
                            localStorage.setItem('docType', props)
                        }}
                        title={translation('selectDocTypeTitle')}
                        points={['Passport', 'ID card', 'Driving license']}
                        icon={'🪪'}
                    />
                    {!isMobile &&
                        <Form
                            onChange={(e) => {
                                setDocNumber(e.target.value)
                                localStorage.setItem('docNumber', e.target.value)
                            }}
                            title={translation('formDocNumbTitle')}
                            placeHolder={translation('formDocNumbPlaceHolder')}
                            value={docNumber}
                            error={error.docNumber}
                        />
                    }
                </div>
                {isMobile &&
                    <Form
                        onChange={(e) => {
                            setDocNumber(e.target.value.toString())
                            localStorage.setItem('docNumber', e.target.value)
                        }}
                        title={translation('formDocNumbTitle')}
                        placeHolder={translation('formDocNumbPlaceHolder')}
                        value={docNumber}
                        error={error.docNumber}
                    />
                }
                <Button disabled={disabledBtn || disabled} handleClick={handleComplete}
                        title={translation('btnContinue')}/>
            </div>
        </ModalPage>
    );
}

export default KPersonalInfo;
