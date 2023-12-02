import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../../auth/AuthContext"
import { jwtDecode } from "jwt-decode";

import axios from "axios"

import Button from "../../components/Button/Button"
import './ProfilePage.css'
import House from '../../assets/icons/house.svg'
import Notification from '../../assets/icons/notification.svg'
import Candado from '../../assets/icons/candado.svg'
import Data from '../../assets/icons/data.svg'
import Pencil from '../../assets/icons/pencil.svg'
import History from '../../assets/icons/history.svg'

function ProfilePage(){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const {token, setToken} = useContext(AuthContext)

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
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    

    return (
        <>
        <div id='profile-page-container'>
            <div id='profile-columns'>
                <div id='profile-card'>
                    <div id='profile-picture'>
                        <img/>
                    </div>
                    <div id='profile-names'>
                        <h1>{username}</h1>
                        <p>they/them</p>
                    </div>
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
                            <td>Gary Diaz</td>
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