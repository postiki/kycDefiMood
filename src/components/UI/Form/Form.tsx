import './Form.scss'
import React from "react";
import PropTypes from "prop-types";

interface IFormProps {
    onChange: (e: any) => void
    title: string,
    placeHolder: string,
    big?: boolean
}

const Form: React.FC<IFormProps> = ({onChange, title, placeHolder, big}) => {
    //TODO add variables mask
    //TODO add big size
    //TODO add small size with place holder position center

    return (
        <div className={'kyc-form'}>
            <label>{title}</label>
            <input placeholder={placeHolder} onChange={onChange}/>
        </div>
    )
}

Form.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    big: PropTypes.bool
}

export default Form;