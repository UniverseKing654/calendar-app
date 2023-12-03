import './ToggleSwitch.css'
import {useContext, useState, useEffect} from 'react';
import  ThemeContext  from '../../hooks/ThemeContext';

function ToggleSwitch() {

    const [theme, setTheme] = useContext(ThemeContext);
    const handleThemeChange = () => {
        const isCurrentDark = theme === 'dark';
        setTheme(isCurrentDark ? 'light' : 'dark');
        console.log(theme) 
    };

    const checked = theme === 'dark' ? true : false;

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
      }, [theme]);


    return(
        <>
        <ThemeContext.Provider value={theme}>
        <label className="toggle_switch">
        <input type="checkbox" onChange={handleThemeChange} checked={checked}></input>
        <span className="toggle round"></span>
        </label>
        </ThemeContext.Provider>
        </>
    )
}

export default ToggleSwitch;