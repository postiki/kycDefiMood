import './KPersonal.scss';
import React, {useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import Form from "../../UI/Form";
import Select from "../../UI/Select";
import Button from "../../UI/Button";
import CheckBox from "../../UI/CheckBox";

interface IKPersonalProps {

}

const KPersonal: React.FC<IKPersonalProps> = () => {
    const translation = useTranslation('personal')

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [citizenship, setCitizenship] = useState('')
    const [residence, setResidence] = useState('')
    const [docType, setDocType] = useState('')
    const [docNumber, setDocNumber] = useState('')
    const [addr, setAddr] = useState('')

    const [checked, setChecked] = useState(false)

    const [pName, setPName] = useState('')
    const [pSite, setPSite] = useState('')

    const [pDesc, setPDesc] = useState('')
    const [pGh, setPGh] = useState('')
    const [pTw, setPTw] = useState('')
    const [pDc, setPDc] = useState('')
    const [pTg, setPTg] = useState('')


    const handleComplete = () => {
        console.log('complete')
    }

    const handleChangeBox = () => {
        setChecked(!checked);
    };

    return (
        <div className="kyc-personal">
            <h1>{translation('title')}</h1>
            <div className="kyc-personal-firstRow">
                <Form
                    onChange={(e) => setName(e.target.value)}
                    title={translation('formNameTitle')}
                    placeHolder={translation('formNamePlaceHolder')}
                />
                <Form
                    onChange={(e) => setDate(e.target.value)}
                    title={translation('formDateTitle')}
                    placeHolder={translation('formDatePlaceHolder')}
                />
            </div>
            <div className="kyc-personal-secondRow">
                <Select
                    onChange={(e) => setCitizenship(e.target.value)}
                    title={translation('selectCitizenshipTitle')}
                    points={['some']}
                />
                <Select
                    onChange={(e) => setResidence(e.target.value)}
                    title={translation('selectResidenceTitle')}
                    points={['some']}
                />
            </div>
            <div className="kyc-personal-thirdRow">
                <Select
                    onChange={(e) => setDocType(e.target.value)}
                    title={translation('selectDocTypeTitle')}
                    points={['some']}
                />
                <Select
                    onChange={(e) => setDocNumber(e.target.value)}
                    title={translation('selectDocNumbTitle')}
                    points={['some']}
                />
            </div>
            <Form
                onChange={(e) => setAddr(e.target.value)}
                title={translation('formWalletTitle')}
                placeHolder={translation('formWalletPlaceHolder')}
            />
            <div className="kyc-personal-fourRow">
                <CheckBox
                    label={translation('checkBoxLabel')}
                    handleChange={handleChangeBox}
                    checked={checked}
                />
                {!checked && <Button handleClick={handleComplete}/>}
            </div>

            {checked && (
                <>
                    <div className="kyc-personal-fiveRow">
                        <Form
                            onChange={(e) => setPName(e.target.value)}
                            title={translation('formPNameTitle')}
                            placeHolder={translation('formPNamePlaceHolder')}
                        />
                        <Form
                            onChange={(e) => setPSite(e.target.value)}
                            title={translation('formPSiteTitle')}
                            placeHolder={translation('formPSitePlaceHolder')}
                        />
                    </div>
                    <Form
                        onChange={(e) => setPDesc(e.target.value)}
                        title={translation('formPDescTitle')}
                        placeHolder={translation('formPDescPlaceHolder')}
                        big
                    />
                    <Form
                        onChange={(e) => setPGh(e.target.value)}
                        title={translation('formPGhTitle')}
                        placeHolder={translation('formPGhPlaceHolder')}
                    />
                    <Form
                        onChange={(e) => setPTw(e.target.value)}
                        title={translation('formPTwTitle')}
                        placeHolder={translation('formPTwPlaceHolder')}
                    />
                    <Form
                        onChange={(e) => setPDc(e.target.value)}
                        title={translation('formPDcTitle')}
                        placeHolder={translation('formPDcPlaceHolder')}
                    />
                    <Form
                        onChange={(e) => setPTg(e.target.value)}
                        title={translation('formPTgTitle')}
                        placeHolder={translation('formPTgPlaceHolder')}
                    />
                    <Button handleClick={handleComplete}/>
                </>
            )}

        </div>
    );
}

export default KPersonal;
