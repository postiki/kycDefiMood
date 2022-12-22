import './KPersonal.scss';
import React, {useEffect, useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import Form from "../../UI/Form";
import Select from "../../UI/Select";
import Button from "../../UI/Button";
import {stageUp, userEmail$} from "../../../entities/progress-manager";

import country from '../../../data/country.json'
import SelectCountry from "../../UI/SelectCountry";

import * as api from '../../../services/api';
import ModalPage from "../../UI/ModalPage";
import {useStore} from "effector-react";
import {useDebounce} from "react-use";
import {ethers} from "ethers";

interface IKPersonalProps {

}

const KPersonal: React.FC<IKPersonalProps> = () => {
    const translation = useTranslation('personal')
    const email = useStore(userEmail$)

    const [name, setName] = useState<string | null>('')
    const [date, setDate] = useState<string | null>('')
    const [citizenship, setCitizenship] = useState<string | null>('')
    const [residence, setResidence] = useState<string | null>('')
    const [docType, setDocType] = useState<string | null>('')
    const [docNumber, setDocNumber] = useState<string | null>('')
    const [addr, setAddr] = useState<string | null>('')

    const [checked, setChecked] = useState(true)

    const [pName, setPName] = useState<string | null>('')
    const [pSite, setPSite] = useState<string | null>('')

    const [pDesc, setPDesc] = useState<string | null>('')
    const [pGh, setPGh] = useState<string | null>('')
    const [pTw, setPTw] = useState<string | null>('')
    const [pDc, setPDc] = useState<string | null>('')
    const [pTg, setPTg] = useState<string | null>('')

    const [disabledBtn, setDisabledBtn] = useState(true)
    const [error, setError] = useState({
        name: '',
        date: '',
        addr: '',
        docNumber: '',
        pName: '',
        pSite: '',
        pDesc: '',
        pGh: '',
        pTw: '',
        pDc: '',
        pTg: '',
    })

    const disabled = !name || !date || !citizenship || !residence ||
        !docType || !docNumber || !pName || !pSite || !pDesc || !(pGh || pTw || pDc || pTg)

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
    const validPName = (regExPDesc.test(pName || '') || pName === '');
    const validPDesc = (regExPDesc.test(pDesc || '') || pDesc === '');

    const regExDate = /(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)/
    const invalidDate = (regExDate.test(date || '') || date === '');

    const regExPSite = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    const regExPSiteHttps = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    const validPSite = (regExPSite.test(pSite || '') || pSite === '');
    const validPSiteHttps = (regExPSiteHttps.test(pSite || '') || pSite === '');

    //TODO add valid domain
    const validPGh = (regExPSite.test(pGh || '') || pGh === '');
    const validPGhHttps = (regExPSiteHttps.test(pGh || '') || pGh === '');
    const validPTw = (regExPSite.test(pTw || '') || pTw === '');
    const validPTwHttps = (regExPSiteHttps.test(pTw || '') || pTw === '');
    const validPDc = (regExPSite.test(pDc || '') || pDc === '');
    const validPDcHttps = (regExPSiteHttps.test(pDc || '') || pDc === '');
    const validPTg = (regExPSite.test(pTg || '') || pTg === '');
    const validPTgHttps = (regExPSiteHttps.test(pTg || '') || pTg === '');


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

            if (addr && !ethers.utils.isAddress(addr)) {
                setError(prevState => ({...prevState, addr: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, addr: ''}))
            }

            if (docNumber && !validDocNumb) {
                setError(prevState => ({...prevState, docNumber: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, docNumber: ''}))
            }

            if (pName && !validPName) {
                setError(prevState => ({...prevState, pName: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, pName: ''}))
            }

            if (pSite && !validPSite && !validPSiteHttps) {
                setError(prevState => ({...prevState, pSite: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, pSite: ''}))
            }

            if (pDesc && !validPDesc) {
                setError(prevState => ({...prevState, pDesc: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, pDesc: ''}))
            }

            if (pGh && !validPGh && !validPGhHttps) {
                setError(prevState => ({...prevState, pGh: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, pGh: ''}))
            }

            if (pTw && !validPTw && !validPTwHttps) {
                setError(prevState => ({...prevState, pTw: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, pTw: ''}))
            }

            if (pDc && !validPDc && !validPDcHttps) {
                setError(prevState => ({...prevState, pDc: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, pDc: ''}))
            }

            if (pTg && !validPTg && !validPTgHttps) {
                setError(prevState => ({...prevState, pTg: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, pTg: ''}))
            }

            setDisabledBtn(false)
        },
        200,
        [name, date, addr, docNumber, pName, pDesc, pSite, pGh, pTw, pDc, pTg]
    );

    const handleComplete = () => {
        const info = {
            name: name,
            date: date,
            citizenship: citizenship,
            residence: residence,
            docType: docType,
            docNumber: docNumber,
            addr: addr,
            pName: pName,
            pSite: pSite,
            pDesc: pDesc,
            pGh: pGh,
            pTw: pTw,
            pDc: pDc,
            pTg: pTg,
        }

        api.addPersonalInfo(email, info).then(success => {
            if (success) stageUp()
        })
    }

    useEffect(() => {
        setName(localStorage.getItem('name'))
        setDate(localStorage.getItem('date'))
        setCitizenship(localStorage.getItem('citizenship'))
        setResidence(localStorage.getItem('residence'))
        setDocType(localStorage.getItem('docType'))
        setDocNumber(localStorage.getItem('docNumber'))
        setAddr(localStorage.getItem('addr'))


        setPName(localStorage.getItem('pName'))
        setPSite(localStorage.getItem('pSite'))
        setPDesc(localStorage.getItem('pDesc'))
        setPGh(localStorage.getItem('pGh'))
        setPTw(localStorage.getItem('pTw'))
        setPDc(localStorage.getItem('pDc'))
        setPTg(localStorage.getItem('pTg'))
    }, [])

    const isMobile = window.innerWidth < 1366

    return (
        <ModalPage>
            <div className="kyc-personal">
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
                        type={'number'}
                        error={error.docNumber}
                    />
                }
                {/*<Form*/}
                {/*    onChange={(e) => {*/}
                {/*        setAddr(e.target.value)*/}
                {/*        localStorage.setItem('addr', e.target.value)*/}
                {/*    }}*/}
                {/*    title={translation('formWalletTitle')}*/}
                {/*    placeHolder={translation('formWalletPlaceHolder')}*/}
                {/*    value={addr}*/}
                {/*    error={error.addr}*/}
                {/*/>*/}
                {/*<div className="kyc-personal-fourRow">*/}
                {/*    <CheckBox*/}
                {/*        label={translation('checkBoxLabel')}*/}
                {/*        onToggle={() => setChecked(!checked)}*/}
                {/*        checked={checked}*/}
                {/*    />*/}
                {/*    {!checked && !isMobile &&*/}
                {/*        <Button disabled={disabledBtn} handleClick={handleComplete}*/}
                {/*                title={translation('btnContinue')}/>}*/}
                {/*</div>*/}
                {/*{!checked && isMobile &&*/}
                {/*    <Button disabled={disabledBtn} handleClick={handleComplete} title={translation('btnContinue')}/>}*/}

                {checked && (
                    <>
                        <div className="kyc-personal-fiveRow">
                            <Form
                                onChange={(e) => {
                                    setPName(e.target.value)
                                    localStorage.setItem('pName', e.target.value)
                                }}
                                title={translation('formPNameTitle')}
                                placeHolder={translation('formPNamePlaceHolder')}
                                value={pName}
                                error={error.pName}
                            />
                            {!isMobile &&
                                <Form
                                    onChange={(e) => {
                                        setPSite(e.target.value)
                                        localStorage.setItem('pSite', e.target.value)
                                    }}
                                    title={translation('formPSiteTitle')}
                                    placeHolder={translation('formPSitePlaceHolder')}
                                    value={pSite}
                                    error={error.pSite}
                                />
                            }
                        </div>
                        {isMobile &&
                            <Form
                                onChange={(e) => {
                                    setPSite(e.target.value)
                                    localStorage.setItem('pSite', e.target.value)
                                }}
                                title={translation('formPSiteTitle')}
                                placeHolder={translation('formPSitePlaceHolder')}
                                value={pSite}
                                error={error.pSite}
                            />
                        }
                        <Form
                            onChange={(e) => {
                                setPDesc(e.target.value)
                                localStorage.setItem('pDesc', e.target.value)
                            }}
                            title={translation('formPDescTitle')}
                            placeHolder={translation('formPDescPlaceHolder')}
                            value={pDesc}
                            error={error.pDesc}
                        />
                        <Form
                            onChange={(e) => {
                                setPGh(e.target.value)
                                localStorage.setItem('pGh', e.target.value)
                            }}
                            title={translation('formPGhTitle')}
                            placeHolder={translation('formPGhPlaceHolder')}
                            value={pGh}
                            error={error.pGh}
                        />
                        <Form
                            onChange={(e) => {
                                setPTw(e.target.value)
                                localStorage.setItem('pTw', e.target.value)
                            }}
                            title={translation('formPTwTitle')}
                            placeHolder={translation('formPTwPlaceHolder')}
                            value={pTw}
                            error={error.pTw}
                        />
                        <Form
                            onChange={(e) => {
                                setPDc(e.target.value)
                                localStorage.setItem('pDc', e.target.value)
                            }}
                            title={translation('formPDcTitle')}
                            placeHolder={translation('formPDcPlaceHolder')}
                            value={pDc}
                            error={error.pDc}
                        />
                        <Form
                            onChange={(e) => {
                                setPTg(e.target.value)
                                localStorage.setItem('pTg', e.target.value)
                            }}
                            title={translation('formPTgTitle')}
                            placeHolder={translation('formPTgPlaceHolder')}
                            value={pTg}
                            error={error.pTg}
                        />
                        <Button disabled={disabledBtn || disabled} handleClick={handleComplete}
                                title={translation('btnContinue')}/>
                    </>
                )}
            </div>
        </ModalPage>
    );
}

export default KPersonal;
