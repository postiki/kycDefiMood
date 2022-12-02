import './Button.scss'
import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import PropTypes from "prop-types";
import classNames from "classnames";

interface IButtonProps {
    handleClick: () => void
    title?: string,
    alt?: boolean
    disabled?: boolean
}

const Button: React.FC<IButtonProps> = ({handleClick, title, alt, disabled}) => {
    // const translation = useTranslation('button')
    //TODO add choose variables title of screen resolution
    return (
        <button className={classNames({
            'kyc-button': true,
            'kyc-button--alt': alt,
            'kyc-button--disabled': disabled
        })}
                disabled={disabled}
                onClick={handleClick}
        >
            <p>{title}</p>
        </button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    alt: PropTypes.bool,
}

export default Button;