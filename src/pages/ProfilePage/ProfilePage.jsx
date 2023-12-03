import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../../auth/AuthContext"
import { jwtDecode } from "jwt-decode";

import axios from "axios"
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button"
import './ProfilePage.css'
import House from '../../assets/icons/house.svg'
import Notification from '../../assets/icons/notification.svg'
import Candado from '../../assets/icons/candado.svg'
import Data from '../../assets/icons/data.svg'
import Pencil from '../../assets/icons/pencil.svg'
import History from '../../assets/icons/history.svg'

function ProfilePage(){

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [profilePic, setProfilePic] = useState(null)
    const {token, logout} = useContext(AuthContext)

    const userId = jwtDecode(token).sub

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
            setUsername(res.data.username)
            setEmail(res.data.email)
            setProfilePic(res.data.profile_pic_path)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const handleLogOut = () => {
        logout()
        navigate('/')
    }
    

    return (
        <>
        <div id='profile-page-container'>
            <div id='profile-columns'>
                <div id='profile-card'>
                    <img 
                        id='profile-picture-big'
                        src={'data:image/jpeg;base64,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'}
                    />
                    <div id='edit-profile-button'>
                        <Button
                            text='Editar Perfil'
                        />
                    </div>
                    
                </div>
                <table id="profile-options">
                    <tbody>
                        <tr className="profile-option action">
                            <td>
                                <img className='profile-option icon' src={House}/>
                            </td>
                            <td>Resumen de la cuenta</td>
                        </tr>
                        <tr>
                            <td>
                                <img className='profile-option icon' src={Notification}/>
                            </td>
                            <td>Ajustes de notificaciones</td>
                        </tr>
                        <tr>
                            <td>
                                <img className='profile-option icon' src={Candado}/>
                            </td>
                            <td>Ajustes de seguridad</td>
                        </tr>
                        <tr>
                            <td>
                                <img className='profile-option icon' src={Data}/>
                            </td>
                            <td>Estadisticas</td>
                        </tr>
                        <tr>
                            <td>
                                <img className='profile-option icon' src={Pencil}/>
                            </td>
                            <td>Personalizacion</td>
                        </tr>
                        <tr>
                            <td>
                                <img className='profile-option icon' src={History}/>
                            </td>
                            <td>Historial de acciones</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id='profile-information'>
                <h2>Mi Perfil</h2>
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <th className="profile-table header">Nombre</th>
                            <td>{username}</td>
                        </tr>
                        <tr>
                            <th className="profile-table header">Correo</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th className="profile-table header">Fecha de Nacimiento</th>
                            <td>Febrero 26, 2002</td>
                        </tr>
                        <tr>
                            <th className="profile-table header">Pais</th>
                            <td>Chile</td>
                        </tr>
                    </tbody>
                </table>
                <h2>Biografia</h2>
                <form>
                    <input type="text"
                    id='biography-form'
                    className="text-form"
                    placeholder="Escribe tu biografia"
                    
                    />
                </form>
                <h2>Cerrar sesion</h2>
                <p> 
                    Para cerrar sesion de tu cuenta 
                    haz click en el siguiente boton.
                </p>
                <Button
                    text='Cerrar Sesion'
                    onClick={() => handleLogOut()}
                />
                <h2>Eliminar Perfil</h2>
                <p> 
                    Para eliminar tu perfil 
                    junto con tu informacion haz click en el siguiente boton.
                    Luego de esto tendras 15 dias para retractar tu decision 
                    hasta que tus datos se borren permanentemente
                </p>
                <Button
                    text='Eliminar Perfil'
                />
            </div>
        </div>
        </>
    )
}

export default ProfilePage