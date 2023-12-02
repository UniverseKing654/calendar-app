import { Calendar, dayjsLocalizer, DateLocalizer } from 'react-big-calendar'
import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import eventos from '../../resources/events'

function MainPage() {

  const localizer = dayjsLocalizer(dayjs)

  const [myEvents, setEvents] = useState(eventos)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  return (
    <>
        <h1 className='title-page'>Mi calendario</h1>
        <div>
            <Calendar
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            style={{ height: 500 , margin: "50px" }}
            />
        </div>
    </>
  );
}

MainPage.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

export default MainPage;