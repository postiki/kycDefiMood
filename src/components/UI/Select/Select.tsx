import './Select.scss'
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CheckBox from "../CheckBox";
import ArrowNext from "../../SvgIcon/ArrowNext";
import classNames from "classnames";

interface ISelectorProps {
    onChange: (props: string) => void
    title: string,
    points: Array<string>,
    icon?: string,
}

const Select: React.FC<ISelectorProps> = ({onChange, title, points, icon}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectItem, setSelectItem] = useState(points[0])

    useEffect(() => {
        onChange(selectItem)
    })

    return (
        <div
            className={classNames({
                'kyc-select': true,
                'kyc-select--open': showDropdown
            })}
            onClick={() => setShowDropdown(!showDropdown)}
        >
            <div className={'kyc-select-title'}>{title}</div>
            <div className={'kyc-select-item'}>
                <p>{icon}{' '}{selectItem}</p>
                <div className={'kyc-select-item__arrow'}>
                    <ArrowNext/>
                </div>
            </div>
            {showDropdown &&
                <div className={'kyc-select-dropdown'}>
                    {points.map((i, index) => {
                        return (
                            <div className={'kyc-select-dropdown-item'}
                                 key={index}
                            >
                                <CheckBox
                                    onToggle={() => setSelectItem(i)}
                                    label={i}
                                    // checked={selectItem === i && true}
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
    icon: PropTypes.string.isRequired,
}

export default Select;