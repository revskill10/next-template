import {useState, useCallback} from 'react'

import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr'

const AppLayout = dynamic(import(/* webpackChunkName: 'layout' */ 'containers/layout-router'))
const Calendar = dynamic(import(/* webpackChunkName: 'calendar' */ 'components/calendars/mui'), {ssr: false})
const Datatable = dynamic(import(/* webpackChunkName: 'datatable' */ 'components/charts/datatable'), { ssr: false })
const Agenda = dynamic(import(/* webpackChunkName: 'agenda' */ 'pages/agenda'), { ssr: false })  

const IndexPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const onDateChange = useCallback((date) => {
    setSelectedDate(date)
  })
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
      meta={<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>}
    >
      <>
      <Calendar date={selectedDate} onChange={onDateChange}></Calendar>
      <NoSSR>
        <Agenda />
        <Datatable />
      </NoSSR>
      </>
    </AppLayout>
  )
}
  
export default IndexPage
