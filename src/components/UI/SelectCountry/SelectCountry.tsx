import './SelectCountry.scss'
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

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
    const [selectItem, setSelectItem] = useState(points[0].name)
    const [filter, setFilter] = useState(points[0].name)

    useEffect(() => {
        onChange(selectItem)
    })

    useEffect(() => setFilter(selectItem), [selectItem])

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

            <div className={'kyc-select-country-input'}>
                <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
            </div>

            {showDropdown &&
                <div className={'kyc-select-country-dropdown'}>
                    {items.map((country, index) => {
                        return (
                            <div
                                key={index}
                                className={'kyc-select-country-dropdown-item'}
                                onClick={() => setSelectItem(country.name)}
                                style={{
                                    // margin: index === 0 ? '15px 0 15px 0' : '10px'
                                }}
                            >
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
    // points: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         name: PropTypes.string.isRequired,
    //         code: PropTypes.string.isRequired,
    //     }).isRequired
    // ),
}

export default SelectCountry;