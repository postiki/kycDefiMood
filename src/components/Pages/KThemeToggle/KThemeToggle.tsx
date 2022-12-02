import './KThemeToggle.scss'

import React from "react";
import DarkMode from "../../SvgIcon/ThemaIcon/DarkMode";
import {useTheme} from "../../../hooks/useThemes";
import LightMode from "../../SvgIcon/ThemaIcon/LightMode";

interface IKThemeToggle {

}

const KThemeToggle: React.FC<IKThemeToggle> = () => {

    const {theme, setTheme} = useTheme()

    return (
        <div className={'ktheme-toggle'} onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
            {theme === 'light' && <DarkMode/>}
            {theme === 'dark' && <LightMode/>}
        </div>
    )
}

KThemeToggle.propTypes = {

}

export default KThemeToggle;