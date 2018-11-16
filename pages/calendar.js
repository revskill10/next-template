import AppLayout from 'containers/layout-router'
import NoSSR from 'react-no-ssr'
import dynamic from 'next/dynamic'
const CalendarTest = dynamic(import(/* webpackChunkName: 'calendar' */ 'components/calendar/test'), { ssr: false })
const Calendar = () => {
  
  return (
    <AppLayout
      title="Calendar"
      description="Calendar"
    >
      <NoSSR>
        <CalendarTest />
      </NoSSR>
    </AppLayout>
  )
}

export default Calendar