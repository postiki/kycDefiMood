import './CheckBox.scss'
import React from "react";
import PropTypes from "prop-types";

interface ISelectorProps {
    onToggle: () => void
    label: string,
    checked?: boolean
}

const CheckBox: React.FC<ISelectorProps> = ({onToggle, label, checked}) => {
    return (
        <div className={'kyc-checkBox'} onClick={() => onToggle()}>
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
    onToggle: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default CheckBox;