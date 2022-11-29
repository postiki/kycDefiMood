import './Form.scss'
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

interface IFormProps {
    onChange: (e: any) => void
    title: string,
    placeHolder: string,
    small?: boolean
}

const Form: React.FC<IFormProps> = ({onChange, title, placeHolder, small}) => {
    //TODO add variables mask
    //TODO add big size
    //TODO add small size with place holder position center

    return (
        <div className={classNames({
            'kyc-form': true,
            'kyc-form--small': small,
        })}
        >
            <label>{title}</label>
            <input placeholder={placeHolder} onChange={onChange}/>
        </div>
    )
}

Form.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    small: PropTypes.bool
}

export default Form;