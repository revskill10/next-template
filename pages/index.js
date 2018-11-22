import { withI18next } from 'lib/hocs/with-i18next'
import {compose} from 'recompose'
import {useState, useCallback} from 'react'
import dynamic from 'next/dynamic'
import Loader from 'components/loader'

const AppLayout = dynamic(import(/* webpackChunkName: 'layout' */ 'containers/layout-router'), {loading: () => <Loader />})
const Calendar = dynamic(import(/* webpackChunkName: 'calendar' */ 'components/calendars/mui'), {ssr: false, loading: () => <Loader />})
const Datatable = dynamic(import(/* webpackChunkName: 'datatable' */ 'components/charts/datatable'), {ssr: false, loading: () => <Loader />})
const Agenda = dynamic(import(/* webpackChunkName: 'agenda' */ 'modules/timetables/components/agenda'), {ssr: false, loading: () => <Loader />})  
const IndexPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const onDateChange = useCallback((date) => {
    setSelectedDate(date)
  })
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
     
    >
      <>
        <Calendar date={selectedDate} onChange={onDateChange} />
        <Agenda />
        <Datatable />
      </>
    </AppLayout>
  )
}
export default compose(
  withI18next(['common', 'report']),
)(IndexPage)
