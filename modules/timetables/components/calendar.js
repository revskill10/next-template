import dynamic from 'next/dynamic'
import Loader from 'components/loader'
import {useContext, useCallback} from 'react'
import { graphql } from 'react-apollo'
import {compose} from 'recompose'

const Calendar = dynamic(import('components/calendars/big-calendar'), {
  loading: () => <Loader />
})

const CalendarWrapper = ({
  context, 
  moveEventMutation, 
  resizeEventMutation
}) => {
  const {
    events,
    resourceMap,
  } = useContext(context)

  console.log(JSON.stringify(events))

  const moveEvent = useCallback(({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) => {
    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, resourceId, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    alert(`${event.title} was moved to ${start}-${end}`)
/*
    this.setState({
      events: nextEvents,
    }, () => {
      alert(`${event.title} was moved to ${start}-${end}`)
    })
*/
  })

  const resizeEvent = useCallback(({ event, start, end }) => {

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    alert(`${event.title} was resized to ${start}-${end}`)
/*
    this.setState({
      events: nextEvents,
    }, () => {
      alert(`${event.title} was resized to ${start}-${end}`)
    })
*/
  })

  const newEvent = useCallback((slotInfo) => {
    console.log(JSON.stringify(slotInfo))
  })

  return (
    <Calendar 
      events={events}
      resourceMap={resourceMap}
      moveEvent={moveEvent}
      resizeEvent={resizeEvent}
      newEvent={newEvent}
    />
  )
}


/*export default compose(
  graphql(moveEventMutation, {name: 'moveEventMutation'}),
  graphql(resizeEventMutation, {name: 'resizeEventMutation'}),
)(CalendarWrapper)*/

export default CalendarWrapper

