import './Select.scss'
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CheckBox from "../CheckBox";

interface ISelectorProps {
    onChange: (props: string) => void
    title: string,
    points: Array<string>,
    doted?: boolean,
}

const Select: React.FC<ISelectorProps> = ({onChange, title, points, doted}) => {
    //TODO refactor
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectItem, setSelectItem] = useState(points[0])

    useEffect(() => {
        onChange(selectItem)
    })

    return (
        <div className={'kyc-select'} onClick={() => setShowDropdown(!showDropdown)}>
            <div className={'kyc-select-title'}>{title}</div>
            <div className={'kyc-select-item'}>
                <div className={'kyc-select-item-dot'}>
                    <div className={'kyc-select-item-dot-check'}/>
                </div>
                <p>{selectItem}</p>
            </div>
            {showDropdown &&
                <div className={'kyc-select-dropdown'}>
                    {points.map((i, index) => {
                        return (
                            <div className={'kyc-select-dropdown-item'}
                                 key={index}
                                 style={{
                                     paddingTop: index === 0 ? 3.5 : 13,
                                     borderBottom: index + 1 === points.length ? 'none' : '2px solid var(--border-color)'
                                 }}
                            >
                                <CheckBox
                                    onToggle={() => setSelectItem(i)}
                                    label={i}
                                    checked={selectItem === i && true}
                                />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default Select;