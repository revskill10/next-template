import AppLayout from 'containers/layout-router'
import NoSSR from 'react-no-ssr'
const Calendar = () => {
  const CalendarTest = dynamic(import(/* webpackChunkName: 'calendar' */ 'components/calendar/test'), { ssr: false })
  return (
    <AppLayout>
      <NoSSR>
        <CalendarTest />
      </NoSSR>
    </AppLayout>
  )
}

export default Calendar