import { useEffect, useState, useContext } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { jwtDecode } from "jwt-decode";

import { IoAddCircle } from "react-icons/io5";

import axios from "axios"

import { useNavigate, NavLink } from "react-router-dom";

import AuthContext from "../../auth/AuthContext";

import './MyEventsPage.css'

function ProfilePage(){

    const navigate = useNavigate()

    const [eventos, setEventos] = useState([])
    const {token} = useContext(AuthContext)
    const userId = jwtDecode(token).sub

    const handleRowClick = (row) => {
        console.log(row)
        navigate(`/events/${row.id}`)
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/events/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setEventos(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[userId, token])

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 150, headerClassName: 'my-events-table-header' },
        { field: 'type', headerName: 'Tipo', width: 150, headerClassName: 'my-events-table-header',
            renderCell: (params) => (<p style={{color: params.row.color , backgroundColor: params.row.color + '19', 
            padding: '5%', borderRadius: 20, borderColor: params.row.color, border: 1, borderStyle: 'solid',
            paddingInline: '15%', fontWeight: 'bold' }}>
                {params.value}
                </p>),
        },
        { field: 'start_date', headerName: 'Inicio', width: 200, headerClassName: 'my-events-table-header',
            renderCell: (params) => (<p>{params.value.split("T")[1].slice(0,5)} {params.value.split("T")[0]}</p>)
        },
        { field: 'end_date', headerName: 'Final', width: 200, headerClassName: 'my-events-table-header',
        renderCell: (params) => (<p>{params.value.split("T")[1].slice(0,5)} {params.value.split("T")[0]}</p>)
        },
        { field: 'status', headerName: 'Status', width: 150, headerClassName: 'my-events-table-header' },
        { field: 'is_all_day', headerName: 'Es todo el dia', width: 150, headerClassName: 'my-events-table-header',
            renderCell: (params) => (params.value ? <p>&#9989;</p> : <p>&#10060;</p> )
        },
        { field: 'is_recurring', headerName: 'Es recurrente', width: 150, headerClassName: 'my-events-table-header',
            renderCell: (params) => (params.value ? <p>&#9989;</p> : <p>&#10060;</p> )
        },
      ];
    return (
        <>
        <div id='my-events-container'>
            <div id='my-events-title-container'>
                <h1>Eventos</h1>
                <NavLink to="/new_event" id="AAA">
                    <IoAddCircle id="add-element-icon"/>
                </NavLink>
            </div>
            <DataGrid
                sx={{
                    borderColor: 'rgba(255, 255, 255, 1)',
                    color: 'rgba(255, 255, 255, 1)',
                    fontFamily: 'Poppins'
                }}
                rows={eventos}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                onRowClick={(row) => {handleRowClick(row)}}
            />
        </div>
        </>
    )
}

export default ProfilePage