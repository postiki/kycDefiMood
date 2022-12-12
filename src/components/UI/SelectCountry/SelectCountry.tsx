import './SelectCountry.scss'
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import flags from '../../../data/emoji.json'
import ArrowNext from "../../SvgIcon/ArrowNext";

interface IObject {
    name: string,
    code: string
}

interface ISelectorProps {
    onChange: (props: string) => void
    title: string,
    points: Array<IObject>,
}

const SelectCountry: React.FC<ISelectorProps> = ({onChange, title, points}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectItem, setSelectItem] = useState(points[66])
    const [filter, setFilter] = useState(points[66].name)

    useEffect(() => {
        onChange(selectItem.name)
    })

    useEffect(() => setFilter(selectItem.name), [selectItem])

    const items = !showDropdown ? points : points.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div
            className={classNames({
                'kyc-select-country': true,
                'kyc-select-country--open': showDropdown,
            })}
            onClick={() => setShowDropdown(!showDropdown)}
        >
            <div className={'kyc-select-country-title'}>
                <p>{title}</p>
            </div>

            <div
                 className={classNames({
                     'kyc-select-country-input': true,
                     'kyc-select-country-input--open': showDropdown
                 })}
            >
                <div className={'kyc-select-country-input__flag'}>
                    {flags.filter(i => i.code === selectItem.code).map(i => i.emoji)}
                </div>
                <input name={'input'} value={filter} onChange={(e) => setFilter(e.target.value)}/>
                <div className={'kyc-select-country-input__arrow'}>
                    <ArrowNext/>
                </div>
            </div>

            {showDropdown &&
                <div className={'kyc-select-country-dropdown'}>
                    {items.map((country, index) => {
                        return (
                            <div
                                key={index}
                                className={'kyc-select-country-dropdown-item'}
                                onClick={() => setSelectItem(country)}
                            >
                                <div className={'kyc-select-country-dropdown-item-flag'}>
                                    {flags.filter(i => i.code === country.code).map(i => i.emoji)}
                                </div>
                                <p>{country.name}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

SelectCountry.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}

export default SelectCountry;