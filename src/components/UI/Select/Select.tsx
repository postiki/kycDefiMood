import './Select.scss'
import React from "react";
import PropTypes from "prop-types";

interface ISelectorProps {
    onChange: (e: any) => void
    title: string,
    points: Array<string>
}

const Select: React.FC<ISelectorProps> = ({onChange, title, points}) => {
    return (
        <div className={'kyc-select'}>
            <label>{title}</label>
            <select onChange={onChange}>
                <option>some</option>
                <option>some</option>
                <option>some</option>
                <option>some</option>
            </select>
        </div>
    )
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default Select;