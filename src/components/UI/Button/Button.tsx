import './Button.scss'
import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import PropTypes from "prop-types";

interface IButtonProps {
    handleClick: () => void
}

const Button: React.FC<IButtonProps> = ({handleClick}) =>{
    const translation = useTranslation('button')
    //TODO add choose variables title of screen resolution
    return (
        <div className={'kyc-button'} onClick={handleClick}>
            <p>{translation('titleD')}</p>
        </div>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func.isRequired
}

export default Button;