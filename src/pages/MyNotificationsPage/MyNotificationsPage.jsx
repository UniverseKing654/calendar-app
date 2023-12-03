import { useEffect, useState, useContext } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { jwtDecode } from "jwt-decode";
import axios from "axios"

import AuthContext from "../../auth/AuthContext";

import './MyNotificationsPage.css'

function MyNotfications(){

    const [reminders, setReminders] = useState([])
    const {token} = useContext(AuthContext)
    const userId = jwtDecode(token).sub

    useEffect(() => {
        console.log(`${import.meta.env.VITE_BACKEND_URL}/users/reminders/${userId}`)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/reminders/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setReminders(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[userId, token])

    const columns = [
        { field: 'title', headerName: 'Nombre', width: 150, headerClassName: 'my-events-table-header' },
        { field: 'body', headerName: 'Descripcion', width: 200, headerClassName: 'my-events-table-header'},
        { field: 'end_date', headerName: 'Tiempo', width: 200, headerClassName: 'my-events-table-header',
            renderCell: (params) => (<p>{params.row.how_many_before} {params.row.type_of_date_before}</p>) },
        { field: 'Event',headerName: 'Evento', width: 150, headerClassName: 'my-events-table-header', 
            renderCell: (params) => (<p>{params.row.Event.name}</p>) },
      ];
    return (
        <>
        <div id='my-notifications-container'>
            <h1>Notificaciones</h1>
            <DataGrid
                sx={{
                    borderColor: 'rgba(255, 255, 255, 1)',
                    color: 'rgba(255, 255, 255, 1)',
                    fontFamily: 'Poppins'
                }}
                rows={reminders}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </div>
        </>
    )
}

export default MyNotfications