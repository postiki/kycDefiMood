import './CheckBox.scss'
import React from "react";
import PropTypes from "prop-types";

interface ISelectorProps {
    handleChange: (e: any) => void
    label: string,
    checked: boolean
}

const CheckBox: React.FC<ISelectorProps> = ({handleChange, label, checked}) => {
    return (
        <div className={'kyc-checkBox'} onClick={handleChange}>
            <div className={'kyc-checkBox__box'}>
                {checked && <div className={'kyc-checkBox__box-check'}></div>}
            </div>
            <div className={'kyc-checkBox__label'}>
                {label}
            </div>
        </div>
    )
}

CheckBox.propTypes = {
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired
}

export default CheckBox;