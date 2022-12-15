import { useLayoutEffect, useState } from 'react'

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkTheme ? 'dark' : 'light'

export const useTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('app-theme') || defaultTheme
    )
    const favicon = document.getElementById('favicon');

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)

        if (isDarkTheme) {
            favicon.href = '/favicon-dark.png';
        } else {
            favicon.href = '/favicon-light.png';
        }

    }, [theme])

    return { theme, setTheme }
}