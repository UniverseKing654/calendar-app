import { useEffect, useState, useContext } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { jwtDecode } from "jwt-decode";
import axios from "axios"

import DateTimePicker from 'react-datetime-picker';
import { useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../../auth/AuthContext";
import Button from '../../components/Button/Button';

import './NewEventPage.css'
import { IoColorFillOutline } from "react-icons/io5";

function NewEventPage(){

    const navigate = useNavigate()
    const location = useLocation();

    const eventId = location.pathname.split("/")[2];

    const [evento, setEvento] = useState([])

    const {token} = useContext(AuthContext)
    const userId = jwtDecode(token).sub

    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [esTodoElDia, setEsTodoElDia] = useState(false)
    const [estatus, setEstatus] = useState('')
    const [inicio, setInicio] = useState(null)
    const [fin, setFin] = useState(null)
    const [color, setColor] = useState('')

    const [reminderTitle, setReminderTitle] = useState('')
    const [reminderBody, setRemiderBody] = useState('')
    const [reminderStatus, setReminderStatus] = useState('')
    const [reminderHowManyBefore, setReminderHowManyBefore] = useState('')
    const [reminderTypeOfDateBefore, setReminderTypeOfDateBefore] = useState('')

    const handleCreation = () => {

        console.log(tipo)

        const params = {
            admin_id: userId,
            type: tipo,
            name: nombre,
            description: descripcion,
            is_all_day: esTodoElDia,
            is_recurring: false,
            is_group: false,
            status: "uncomplete",
            start_date: formatDate(inicio),
            end_date: formatDate(fin),
            color: color
        }

        

        console.log(params)
        
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/events`, params)
            .then((response) => {
                console.log(response.data)

                const event_id = response.data.id

                return event_id 
            })
            .then((result) => {

                const reminderParams = {
                    event_id: result,
                    title: reminderTitle,
                    body: reminderBody,
                    status: "false",
                    how_many_before: parseInt(reminderHowManyBefore),
                    type_of_date_before: reminderTypeOfDateBefore
                }

                console.log(reminderParams)

                axios.post(`${import.meta.env.VITE_BACKEND_URL}/reminders`, reminderParams)
                    .then((response)=>{
                        console.log(response)
                        navigate('/events')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const formatDate = (date) => {

        const year = date.split(" ")[0].split("-")[0]
        const month = parseInt(date.split(" ")[0].split("-")[1])-1
        const day = parseInt(date.split(" ")[0].split("-")[2])
        const hour = parseInt(date.split(" ")[1].split(":")[0])
        const minute = parseInt(date.split(" ")[1].split(":")[1])

        console.log(date.split(" ")[1])
        console.log(year, month, day, hour, minute)

        const newDate = new Date(year, month, day, hour, minute)

        console.log(newDate)

        return newDate;


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

    return (
        <>
        <div id='my-events-container'>
            <h1>Nuevo evento</h1>
            <table>
                <tr>
                    <td>Nombre</td>
                    <td>
                        <input value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>Tipo</td>
                    <td>
                    <select value={tipo} onChange={(e) => {setTipo(e.target.value); console.log(e.target.value)}}>
                        <option value="event">Evento</option>
                        <option value="task">Tarea</option>
                        <option value="reminder">Recordatorio</option>
                        <option value="class">Clase</option>
                        <option value="test">Prueba</option>
                        <option value="assignment">Entrega</option>
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Descripcion</td>
                    <td>
                        <input value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>Es todo el dia</td>
                    <td><input 
                        type="checkbox" 
                        value={evento.is_all_day}
                        onChange={(e) => setEsTodoElDia(e.target.checked)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Estatus</td>
                    <td>uncompleted</td>
                </tr>
                <tr>
                    <td>Inicio</td>
                    <td>
                        <input 
                            value={inicio} 
                            onChange={(e)=>{setInicio(e.target.value)}}
                            placeholder="YYYY-MM-DD hh:mm"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Fin</td>
                    <td>
                        <input 
                            value={fin} 
                            onChange={(e)=>{setFin(e.target.value)}}
                            placeholder="YYYY-MM-DD hh:mm"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Color</td>
                    <td>
                        <input 
                            type='color' 
                            value={color}
                            onChange={(e)=>setColor(e.target.value)}
                        />
                    </td>
                </tr>
            </table>
            <h2>Recordatorio</h2>
            <table>
                <tr>
                    <td>Nombre</td>
                    <td>
                        <input value={reminderTitle} onChange={(e)=>setReminderTitle(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>Descripcion</td>
                    <td>
                        <input value={reminderBody} onChange={(e)=>setRemiderBody(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>Estatus</td>
                    <td>uncompleted</td>
                </tr>
                <tr>
                    <td>Tiempo antes</td>
                    <td>
                        <input 
                            value={reminderHowManyBefore} 
                            onChange={(e)=>{setReminderHowManyBefore(e.target.value)}}
                            placeholder=""
                        />
                        <select value={reminderTypeOfDateBefore} 
                        onChange={(e) => {setReminderTypeOfDateBefore(e.target.value); console.log(e.target.value)}}>
                            <option value="mm">Minutos</option>
                            <option value="hh">Horas</option>
                            <option value="DD">Dias</option>
                            <option value="MM">Meses</option>
                            <option value="YY">Años</option>
                        </select>
                    </td>
                </tr>
            </table>
            <div id='event-page-buttons'>
                <Button
                    text={"Crear evento"}
                    onClick={() => handleCreation()}
                />
            </div>
        </div>
        </>
    )
}

export default NewEventPage