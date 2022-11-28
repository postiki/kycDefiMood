import './Form.scss'
import React from "react";
import PropTypes from "prop-types";

interface IFormProps {
    onChange: (e: any) => void
    title: string,
    placeHolder: string,
}

const Form: React.FC<IFormProps> = ({onChange, title, placeHolder}) => {
    //TODO add variables mask
    return (
        <input className={'kyc-form'} placeholder={placeHolder} onChange={onChange}/>
    )
}

Form.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
}

export default Form;