import {Component} from 'react'
import { withI18next } from 'lib/hocs/with-i18next'
import {compose} from 'recompose'
import {useState, useCallback} from 'react'
import dynamic from 'next/dynamic'
import Loader from 'components/loader'
import withInitialProps from 'lib/hocs/with-initial-props'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
const Layout = dynamic(import(/* webpackChunkName: 'layout' */ 'containers/layout-router'), {loading: () => <Loader />})
const Calendar = dynamic(import(/* webpackChunkName: 'calendar' */ 'modules/timetables/containers'), {
  ssr: false,
  loading: () => <Loader />
})
import {getInitialProps} from 'modules/timetables/containers'
const Datatable = dynamic(import(/* webpackChunkName: 'datatable' */ 'components/charts/datatable'), {ssr: false, loading: () => <Loader />})
const Agenda = dynamic(import(/* webpackChunkName: 'agenda' */ 'modules/timetables/components/agenda'), {ssr: false, loading: () => <Loader />})  
const Tab = dynamic(import(/* webpackChunkName: 'tab' */ 'components/tabs/guest'), {loading: () => <Loader />} )
const VerticalTab = dynamic(import(/* webpackChunkName: 'vertical-tab' */ 'components/tabs/vertical'), {loading: () => <Loader />} )
/*
const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const onDateChange = useCallback((date) => {
    setSelectedDate(date)
  })

  return <Calendar date={selectedDate} onChange={onDateChange} />
}
*/


const items = [
  { label: 'Calendar', component: Calendar},
  { label: 'Agenda', component: Agenda},
  { label: 'Datatable', component: Datatable },
  { label: 'Vertical', component: VerticalTab },
]

const IndexPage = () => {
  return (
    <Layout
      title='Home page'
      description='Simple things'      
    >
      <Tab items={items} />
    </Layout>
  )
}

export default compose(
  withInitialProps(getInitialProps),
  withI18next(['common', 'report', 'timetables']),
)(IndexPage)
