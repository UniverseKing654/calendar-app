import Button from "../../components/Button/Button"
import React, { useState, useContext } from "react"
import axios from "axios";
import AuthContext from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";


import "./LoginPage.css"

function LoginPage(){

    const navigate = useNavigate()
    const {token, setToken} = useContext(AuthContext)
    const [inputs, setInputs] = useState({});

    const handleChange = (e, inputName) => {
        setInputs({...inputs, [inputName]: e.target.value})
    }
    
    const formSubmit = async () => {
        console.log(`${import.meta.env.VITE_BACKEND_URL}/auth/login`)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, inputs)
            .then(response => {

                console.log(response.data)

                const token = response.data.access_token
                setToken(token)
                navigate('/main')
                
            
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
        <div id='login-view'>
            <div id='login-container'>
                <h1 id='login-popup-title'>Iniciar Sesion</h1>
                <input 
                    type='text' 
                    placeholder='Correo Electronico' 
                    className='login-input'
                    value={inputs.email || ""}
                    onChange={(e) => handleChange(e, "email")}
                />
                <input 
                    type='password' 
                    placeholder='Contraseña' 
                    className='login-input'
                    value={inputs.password || ""}
                    onChange={(e) => handleChange(e, "password")}
                />
                <Button text='Iniciar Sesion' onClick={formSubmit}/>
                <p id='login-text'>¿No tienes una cuenta? <a href='#'>Registrate</a></p>
            </div>
        </div>
        </>
    )
}

export default LoginPage