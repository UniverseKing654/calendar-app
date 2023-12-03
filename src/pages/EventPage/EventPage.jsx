import { useEffect, useState, useContext } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { jwtDecode } from "jwt-decode";
import axios from "axios"

import DateTimePicker from 'react-datetime-picker';
import { useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../../auth/AuthContext";
import Button from '../../components/Button/Button';

import './EventPage.css'

function EventPage(){

    const navigate = useNavigate()
    const location = useLocation();

    const eventId = location.pathname.split("/")[2];

    const [evento, setEvento] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const {token} = useContext(AuthContext)

    const [textButton, setTextButton] = useState('Editar evento')

    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [esTodoElDia, setEsTodoElDia] = useState(false)
    const [estatus, setEstatus] = useState('')
    const [inicio, setInicio] = useState('2023-10-30T08:00:00.000Z')
    const [fin, setFin] = useState('2023-10-30T08:00:00.000Z')
    const [color, setColor] = useState('')

    const handleEditing = () => {
        
        if (isEditing){
        
            axios.patch(`${import.meta.env.VITE_BACKEND_URL}/events/${eventId}`, {
                name: nombre,
                type: tipo,
                description: descripcion,
                is_all_day: esTodoElDia,
                status: estatus,
                start_date: inicio,
                end_date: fin,
                color: color
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data)
                setIsEditing(false)
                setTextButton('Editar evento') 
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else{
            setIsEditing(true)
            setTextButton('Guardar cambios')
        }
    }

    const handleDeleting = () => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/events/${eventId}`)
            .then((response) => {
                console.log(response.data)
                navigate('/events')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)

            setNombre(response.data.name)
            setTipo(response.data.type)
            setDescripcion(response.data.description)
            setEsTodoElDia(response.data.is_all_day)
            setEstatus(response.data.status)
            setInicio(response.data.start_date)
            setFin(response.data.end_date)
            setColor(response.data.color)

            setEvento(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[eventId, token])

    return (
        <>
        <div id='my-events-container'>
            <h1>{evento.name}</h1>
            <table>
                <tr>
                    <td>Tipo</td>
                    <td>{isEditing ? 
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="event">Evento</option>
                        <option value="task">Tarea</option>
                        <option value="reminder">Recordatorio</option>
                        <option value="class">Clase</option>
                        <option value="test">Prueba</option>
                        <option value="assignment">Tarea</option>
                    </select>
                    :
                    tipo}</td>
                </tr>
                <tr>
                    <td>Descripcion</td>
                    <td>{isEditing ?
                    <input value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                    :
                    descripcion}</td>
                </tr>
                <tr>
                    <td>Es todo el dia</td>
                    <td><input 
                        type="checkbox" 
                        value={evento.is_all_day}
                        disabled = {!isEditing}
                        onChange={(e) => setEsTodoElDia(e.target.checked)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Estatus</td>
                    <td>{evento.status}</td>
                </tr>
                <tr>
                    <td>Inicio</td>
                    <td>{isEditing ? <input value={inicio} onChange={(e)=>{setInicio(e.target.value)}}/>
                    : <p>
                    {inicio!=null && inicio.split('T')[1].slice(0,5)}{' '}
                    {inicio!= null && inicio.split('T')[0]}</p>
                    }</td>
                </tr>
                <tr>
                    <td>Fin</td>
                    <td>{isEditing ? <input value={fin} onChange={(e)=>{setInicio(e.target.value)}}/>
                    : <p>
                    {fin!=null && fin.split('T')[1].slice(0,5)}{' '}
                        {fin!= null && fin.split('T')[0]}</p>
                    }</td>
                </tr>
                <tr>
                    <td>Color</td>
                    <td><input type='color' value={color} disabled={!isEditing}/></td>
                </tr>
            </table>
            <div id='event-page-buttons'>
                <Button
                    text={textButton}
                    onClick={() => handleEditing()}
                />
                <Button
                    id = 'delete-button'
                    text='Borrar evento'
                    onClick={() => handleDeleting()}
                />
            </div>
        </div>
        </>
    )
}

export default EventPage