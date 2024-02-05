import './KProjectInfo.scss';
import React, {useEffect, useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import Form from "../../UI/Form";
import Button from "../../UI/Button";

import ModalPage from "../../UI/ModalPage";
import {useDebounce} from "react-use";
import {ethers} from "ethers";
import {saveProjectInfo} from "../../../entities/KYC/project";

interface IKPersonalProps {

}

const KProjectInfo: React.FC<IKPersonalProps> = () => {
    //TODO localize
    const translation = useTranslation('personal')

    const [addrProject, setAddrProject] = useState<string>('')
    const [chain, setChain] = useState<string>('')

    const [pName, setPName] = useState<string>('')
    const [pSite, setPSite] = useState<string>('')

    const [pDesc, setPDesc] = useState<string>('')
    const [pGh, setPGh] = useState<string>('')
    const [pTw, setPTw] = useState<string>('')
    const [pDc, setPDc] = useState<string>('')
    const [pTg, setPTg] = useState<string>('')

    const [disabledBtn, setDisabledBtn] = useState(true)
    const [error, setError] = useState({
        addrProject: '',
        chain: '',
        docNumber: '',
        pName: '',
        pSite: '',
        pDesc: '',
        pGh: '',
        pTw: '',
        pDc: '',
        pTg: '',
    })

    const disabled = !chain || !addrProject ||
        !pName || !pSite || !pDesc || !(pGh || pTw || pDc || pTg)

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
    const validChain = (regExFullName.test(chain || '') || chain === '');
    const regExPDesc = /^[a-zA-Z0-9 ]*$/;
    const validPName = (regExPDesc.test(pName || '') || pName === '');
    const validPDesc = (regExPDesc.test(pDesc || '') || pDesc === '');

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
            if (chain && !validChain) {
                setError(prevState => ({...prevState, chain: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, chain: ''}))
            }

            if (addrProject && !ethers.utils.isAddress(addrProject)) {
                setError(prevState => ({...prevState, addrProject: 'error'}))
                setDisabledBtn(true)
                return
            } else {
                setError(prevState => ({...prevState, addrProject: ''}))
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
        [addrProject, pName, pDesc, pSite, pGh, pTw, pDc, pTg, chain]
    );

    const handleComplete = () => {
        const info = {
            addrProject: addrProject,
            projectChain: chain,
            pName: pName,
            pSite: pSite,
            pDesc: pDesc,
            pGh: pGh,
            pTw: pTw,
            pDc: pDc,
            pTg: pTg,
        }
        saveProjectInfo(info)
    }

    useEffect(() => {
        setAddrProject(localStorage.getItem('addr') || '')
        setChain(localStorage.getItem('chain') || '')
        setPName(localStorage.getItem('pName') || '')
        setPSite(localStorage.getItem('pSite') || '')
        // setPDesc(localStorage.getItem('pDesc'))
        setPGh(localStorage.getItem('pGh') || '')
        setPTw(localStorage.getItem('pTw') || '')
        setPDc(localStorage.getItem('pDc') || '')
        setPTg(localStorage.getItem('pTg') || '')
    }, [])

    const isMobile = window.innerWidth < 1366

    return (
        <ModalPage>
            <div className="kyc-project">
                <div className="kyc-project-title">
                    <p>/.env</p>
                </div>
                <h1>{translation('title')}</h1>
                <div className="kyc-project-firstRow">
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
                </div>
                <Form
                    onChange={(e) => {
                        setChain(e.target.value)
                        localStorage.setItem('chain', e.target.value)
                    }}
                    title={translation('formChainTitle')}
                    placeHolder={translation('formChainPlaceHolder')}
                    value={chain}
                    error={error.chain}
                />
                <Form
                    onChange={(e) => {
                        setChain(e.target.value)
                        localStorage.setItem('pAddr', e.target.value)
                    }}
                    title={translation('formWalletTitle')}
                    placeHolder={translation('formWalletPlaceholdes')}
                    value={addrProject}
                    error={error.addrProject}
                />
                <div className={'project-description'}>
                    <p>{translation('formPDescTitle')}</p>
                    <textarea
                        onChange={(e) => {
                            setPDesc(e.target.value)
                        }}
                        placeholder={translation('formPDescPlaceHolder')}
                    />
                    <div className={'counter'}>{pDesc?.length} / 200 {translation('symbols')}</div>
                </div>

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

            </div>
        </ModalPage>
    );
}

export default KProjectInfo;
