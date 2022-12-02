import './KPersonal.scss';
import React, {useEffect, useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import Form from "../../UI/Form";
import Select from "../../UI/Select";
import Button from "../../UI/Button";
import CheckBox from "../../UI/CheckBox";
import {stageUp} from "../../../entities/progress-manager";

import country from './country.json'
import SelectCountry from "../../UI/SelectCountry";
import KContinueOnPhone from "./KContinueOnPhone";

interface IKPersonalProps {

}

const KPersonal: React.FC<IKPersonalProps> = () => {
    const translation = useTranslation('personal')

    const [name, setName] = useState<string | null>('')
    const [date, setDate] = useState<string | null>('')
    const [citizenship, setCitizenship] = useState<string | null>('')
    const [residence, setResidence] = useState<string | null>('')
    const [docType, setDocType] = useState<string | null>('')
    const [docNumber, setDocNumber] = useState<string | null>('')
    const [addr, setAddr] = useState<string | null>('')

    const [checked, setChecked] = useState(false)

    const [pName, setPName] = useState<string | null>('')
    const [pSite, setPSite] = useState<string | null>('')

    const [pDesc, setPDesc] = useState<string | null>('')
    const [pGh, setPGh] = useState<string | null>('')
    const [pTw, setPTw] = useState<string | null>('')
    const [pDc, setPDc] = useState<string | null>('')
    const [pTg, setPTg] = useState<string | null>('')

    const [complete, setComplete] = useState(false)


    const handleComplete = () => {
        //TODO send here data to backend

        setComplete(true)
        if (isMobile){
            stageUp()
        }
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

    if (complete && !isMobile) {
        return (
            <KContinueOnPhone/>
        )
    }

    return (
        <div className="kyc-personal">
            <div className="kyc-personal__wrapper">
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
                        />
                    }
                </div>
                {isMobile &&
                    <Form
                        onChange={(e) => {
                            setDocNumber(e.target.value)
                            localStorage.setItem('docNumber', e.target.value)
                        }}
                        title={translation('formDocNumbTitle')}
                        placeHolder={translation('formDocNumbPlaceHolder')}
                        value={docNumber}
                    />
                }
                <Form
                    onChange={(e) => {
                        setAddr(e.target.value)
                        localStorage.setItem('addr', e.target.value)
                    }}
                    title={translation('formWalletTitle')}
                    placeHolder={translation('formWalletPlaceHolder')}
                    value={addr}
                />
                <div className="kyc-personal-fourRow">
                    <CheckBox
                        label={translation('checkBoxLabel')}
                        onToggle={() => setChecked(!checked)}
                        checked={checked}
                    />
                    {!checked && !isMobile && <Button handleClick={handleComplete} title={translation('btnContinue')}/>}
                </div>
                {!checked && isMobile && <Button handleClick={handleComplete} title={translation('btnContinue')}/>}

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
                        />
                        <Form
                            onChange={(e) => {
                                setPGh(e.target.value)
                                localStorage.setItem('pGh', e.target.value)
                            }}
                            title={translation('formPGhTitle')}
                            placeHolder={translation('formPGhPlaceHolder')}
                            value={pGh}
                        />
                        <Form
                            onChange={(e) => {
                                setPTw(e.target.value)
                                localStorage.setItem('pTw', e.target.value)
                            }}
                            title={translation('formPTwTitle')}
                            placeHolder={translation('formPTwPlaceHolder')}
                            value={pTw}
                        />
                        <Form
                            onChange={(e) => {
                                setPDc(e.target.value)
                                localStorage.setItem('pDc', e.target.value)
                            }}
                            title={translation('formPDcTitle')}
                            placeHolder={translation('formPDcPlaceHolder')}
                            value={pDc}
                        />
                        <Form
                            onChange={(e) => {
                                setPTg(e.target.value)
                                localStorage.setItem('pTg', e.target.value)
                            }}
                            title={translation('formPTgTitle')}
                            placeHolder={translation('formPTgPlaceHolder')}
                            value={pTg}
                        />
                        <Button handleClick={handleComplete} title={translation('btnContinue')}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default KPersonal;
