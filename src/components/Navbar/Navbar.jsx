import {useContext} from "react"
import { NavLink } from "react-router-dom";
import { IoCalendarClearOutline, 
    IoPerson} from "react-icons/io5";
import AuthContext from "../../auth/AuthContext";

import './Navbar.css'

function Navbar() {

    const {token} = useContext(AuthContext)

    return (
        <>
        <header>
        <nav id="navbar">
            <div id="navbar-left-container">
                <NavLink to="" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                    <IoCalendarClearOutline id="navbar-calendar-icon"/>
                </NavLink>
            </div>
            <ul id="navbar-links-container">
                <li className="navbar-element">
                    <NavLink to="main" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                        Home
                    </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to="instructions" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                        Instructions
                    </NavLink>
                </li>
                {(token && token!=='null') && 
                <>
                <li className="navbar-element">
                    <NavLink to="entrydata" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                        Entrydata
                    </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to="events" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                        Eventos
                    </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to="my_notifications" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                        Notificaciones
                    </NavLink>
                </li> 
                </>}
                
            </ul>
            <div id="navbar-right-container">
                {token && token!=='null' ? 
                <NavLink to="profile" className="nav-link">
                    <div id="user-profile-navbar">
                        <IoPerson id="navbar-user-icon"/>
                        <p>Profile</p>
                    </div>
                </NavLink>
                :
                <ul id="navbar-links-container">
                    <li className="navbar-element">
                        <NavLink to="register" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                            Crear cuenta
                        </NavLink>
                    </li>
                    <li className="navbar-element">
                        <NavLink to="login" className={({isActive}) => isActive ? "navbar-link active" : "navbar-link"}>
                            Iniciar sesion
                        </NavLink>
                    </li>
                </ul>
                }


                
            </div>
        </nav>
        </header>
        </>
    )
}
export default Navbar;