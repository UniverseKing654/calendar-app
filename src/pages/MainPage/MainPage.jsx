import { Calendar, dayjsLocalizer, DateLocalizer } from 'react-big-calendar'
import { useState, useCallback, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { jwtDecode } from "jwt-decode";

import axios from 'axios';

import AuthContext from "../../auth/AuthContext";

import './Calendar.css'

function MainPage() {

  const localizer = dayjsLocalizer(dayjs)

  const [eventos, setEventos] = useState([])

  const {token} = useContext(AuthContext)
  const userId = jwtDecode(token).sub


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

  return (
    <>
        <h1 className='title-page'>Mi calendario</h1>
        <div>
            <Calendar
            localizer={localizer}
            events={eventos}
            titleAccessor={'name'}
            startAccessor="start_date"
            endAccessor="end_date"
            selectable
            />
        </div>
    </>
  );
}

MainPage.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

export default MainPage;