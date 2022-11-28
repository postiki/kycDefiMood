import './KPersonal.scss';
import React, {useState} from 'react';
import useTranslation from "../../../hooks/useTranslation";
import Form from "../../UI/Form";
import Select from "../../UI/Select";
import Button from "../../UI/Button";

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

    //TODO create checkBox component

    const handleComplete = () => {

    }

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
                />
                <Select
                    onChange={(e) => setResidence(e.target.value)}
                    title={translation('selectResidenceTitle')}
                />
            </div>
            <div className="kyc-personal-thirdRow">
                <Select
                    onChange={(e) => setDocType(e.target.value)}
                    title={translation('selectDocTypeTitle')}
                />
                <Select
                    onChange={(e) => setDocNumber(e.target.value)}
                    title={translation('selectDocNumbTitle')}
                />
            </div>
            <Form
                onChange={(e) => setAddr(e.target.value)}
                title={translation('formWalletTitle')}
                placeHolder={translation('formWalletPlaceHolder')}
            />
            <div className="kyc-personal-fourRow">
                <input type={'checkbox'} checked={checked}/>
                <label onChange={() => setChecked(!checked)}>
                    {translation('checkBoxLabel')}
                </label>
                {!checked && <Button handleClick={handleComplete}/>}
            </div>
        </div>
    );
}

export default KPersonal;
