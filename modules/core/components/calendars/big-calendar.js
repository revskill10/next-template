import React from 'react'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import CalendarToolbar from 'components/calendars/calendar-toolbar'

//BigCalendar.setLocalizer(localizer);
const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
  {
    id: 3,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 6,
  },
  {
    id: 4,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 7,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
  { resourceId: 6, resourceTitle: 'Meeting room 2' },
  { resourceId: 7, resourceTitle: 'Meeting room 2' },
]
const DragAndDropCalendar = withDragAndDrop(BigCalendar)
const Dnd = ({
  events = events,
  resourceMap = resourceMap,
  resizeEvent,
  moveEvent,
  newEvent,
  lng = 'vi',
  components = {
    toolbar: CalendarToolbar
  },
  defaultDate=new Date(2018, 0, 29),
  views=['day', 'work_week'],
  min=moment('6:00', 'h:mm').toDate(),
  max=moment('21:00', 'h:mm').toDate(),
}) => {
  if (lng === 'vi') {
    require('moment/locale/vi.js');
  } else {
    require('moment/locale/vi.js');
  }
  
  const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
  return (
    <DragAndDropCalendar
      selectable
      events={events}
      onEventDrop={moveEvent}
      resizable
      localizer={localizer}
      resources={resourceMap}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      onEventResize={resizeEvent}
      defaultView="day"
      defaultDate={defaultDate}
      showMultiDayTimes
      onSelectSlot={newEvent}
      min={min}
      max={max}
      views={views}
      components={components}
    />
  )
}
    
export default Dnd