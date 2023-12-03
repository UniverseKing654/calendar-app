import Button from "../../components/Button/Button"
import React, { useState, useContext } from "react"
import axios from "axios";
import AuthContext from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css"

function RegisterPage(){

    const navigate = useNavigate()
    const {token, setToken} = useContext(AuthContext)
    const [inputs, setInputs] = useState({});

    const handleChange = (e, inputName) => {
        setInputs({...inputs, [inputName]: e.target.value})
    }
    
    const formSubmit = async () => {
        console.log(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, inputs)
            .then(response => {

                console.log(response.data)

                axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, inputs)
                    .then(response => {

                        console.log(response.data)
                        const token = response.data.access_token
                        setToken(token)
                        navigate('/main')
                    })
            
            })
            .catch(error => {
                console.log(error)
            })
        }

    return (
        <>
        <div id='register-view'>
            <div id='register-container'>
                <h1 id='register-popup-title'>Registrarse</h1>
                <input 
                    type='text' 
                    placeholder='Nombre de Usuario' 
                    className='register-input'
                    value={inputs.username || ""}
                    onChange={(e) => handleChange(e, "username")}
                />
                <input 
                    type='text' 
                    placeholder='Correo Electronico' 
                    className='register-input'
                    value={inputs.email || ""}
                    onChange={(e) => handleChange(e, "email")}    
                />
                <input 
                    type='password' 
                    placeholder='Contraseña' 
                    className='register-input'
                    value={inputs.password || ""}
                    onChange={(e) => handleChange(e, "password")}    
                />
                <Button text='Registrarse' onClick={formSubmit}/>
                <p id='register-text'>¿Ya tienes una cuenta? <a href='#'>Iniciar sesion</a></p>
            </div>
        </div>
        </>
    )
}

export default RegisterPage