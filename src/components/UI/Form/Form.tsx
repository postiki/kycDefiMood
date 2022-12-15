import './Form.scss'
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import InputMask from 'react-input-mask';

interface IFormProps {
    onChange: (e: any) => void
    title: string,
    placeHolder: string,
    small?: boolean,
    value?: string | number | null
    enabledError?: boolean
    error?: string
    mask?: string
    type?: string

}

const Form: React.FC<IFormProps> = ({
                                        onChange,
                                        title,
                                        placeHolder,
                                        small,
                                        value,
                                        enabledError,
                                        error,
                                        mask,
                                        type
}) => {

    return (
        <div className={classNames({
            'kyc-form': true,
            'kyc-form--small': small,
            'kyc-form--error': error,
            'kyc-form--enabledError': enabledError,
        })}
        >
            <p>{title}</p>
            <InputMask mask={mask || ''} value={value || ''} onChange={onChange}>
                <input placeholder={placeHolder} type={type}/>
            </InputMask>
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
    enabledError: PropTypes.bool,
    error: PropTypes.string,
    mask: PropTypes.string,
    type: PropTypes.string,
}

export default Form;