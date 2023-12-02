import { useContext, useState, useEffect } from 'react'
import Router from './Router.jsx'
import ThemeContext from './hooks/ThemeContext.jsx'

function App() {
  const [theme, setTheme] = useState('dark')

  document.documentElement.setAttribute("data-theme", 'dark');

  return (
    <>
      <ThemeContext.Provider value={[theme, setTheme]}>
        <Router/>
      </ThemeContext.Provider>
    </>
  )
}

export default App
