import './Form.scss'
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

interface IFormProps {
    onChange: (e: any) => void
    title: string,
    placeHolder: string,
    small?: boolean,
    value?: string | number | null
    error?: string
}

const Form: React.FC<IFormProps> = ({onChange, title, placeHolder, small, value, error}) => {

    return (
        <div className={classNames({
            'kyc-form': true,
            'kyc-form--small': small,
            'kyc-form--error': error,
        })}
        >
            <p>{title}</p>
            <input placeholder={placeHolder} value={value || ''} onChange={onChange}/>
            {error && <div className={'kyc-form-error'}>{error}</div>}
        </div>
    )
}

Form.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    small: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string
}

export default Form;