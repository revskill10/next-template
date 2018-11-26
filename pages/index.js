import {Component} from 'react'
import { withI18next } from 'lib/hocs/with-i18next'
import {withNamespaces} from 'react-i18next'
import {compose} from 'recompose'
import {useState, useCallback} from 'react'
import dynamic from 'next/dynamic'
import Loader from 'components/loader'
import withMultipleInitialProps from 'lib/hocs/with-multiple-initial-props'
import { getInitialProps as getAdminProps } from 'modules/user/components/admin'
import {getInitialProps as getTimetablesProps} from 'modules/timetables/containers'
import {getInitialProps as getEduProps} from 'modules/edu/containers'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Layout = dynamic(import(/* webpackChunkName: 'layout' */ 'containers/layout-router'), {loading: () => <Loader />})
const Calendar = dynamic(import(/* webpackChunkName: 'calendar' */ 'modules/timetables/containers'), { ssr: false, loading: () => <Loader />})
const Datatable = dynamic(import(/* webpackChunkName: 'datatable' */ 'components/charts/datatable'), {ssr: false, loading: () => <Loader />})
const Attendance = dynamic(import(/* webpackChunkName: 'agenda' */ 'modules/attendance/components/attendance'), {ssr: false, loading: () => <Loader />})  
const Tab = dynamic(import(/* webpackChunkName: 'tab' */ 'components/tabs/guest'), {loading: () => <Loader />} )
const VerticalTab = dynamic(import(/* webpackChunkName: 'vertical-tab' */ 'components/tabs/vertical'), {loading: () => <Loader />} )
const Admin = dynamic(import(/* webpackChunkName: 'admin' */ 'modules/user/components/admin'), {ssr: false, loading: () => <Loader />})
const Semester = dynamic(import(/* webpackChunkName: 'semester' */ 'modules/edu/containers'), {ssr: false, loading: () => <Loader />})

const items = [
  { label: 'Planning', component: Semester},
  { label: 'Calendar', component: Calendar},
  { label: 'Attendance', component: Attendance},
  { label: 'User', component: Admin}
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
  withMultipleInitialProps([
    getTimetablesProps,
    getAdminProps,
    getEduProps,
  ]),
  withI18next(['common', 'report', 'timetables', 'admin']),
)(IndexPage)
