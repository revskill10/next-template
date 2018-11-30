import "antd/dist/antd.css";
import { withI18next } from 'lib/hocs/with-i18next'
import {withNamespaces} from 'react-i18next'
import dynamic from 'next/dynamic'
import withMultipleInitialProps from 'lib/hocs/with-multiple-initial-props'
import { getInitialProps as getAdminProps } from 'modules/user/components/admin'
import {getInitialProps as getTimetablesProps} from 'modules/timetables/containers'
import {getInitialProps as getEduProps} from 'modules/edu/containers'
//import Layout from 'containers/layouts/guest'
import Tab from 'components/tabs/antd'

const Loader = () => <div>...</div>
const Layout = dynamic(import(/* webpackChunkName: 'layout' */ 'containers/layouts/guest'), {loading: () => <Loader />})
const Datatable = dynamic(import(/* webpackChunkName: 'datatable' */ 'components/charts/datatable'), {ssr: false, loading: () => <Loader />})
const Attendance = dynamic(import(/* webpackChunkName: 'agenda' */ 'modules/attendance/components/attendance'), {ssr: false, loading: () => <Loader />})  
//const Tab = dynamic(import(/* webpackChunkName: 'tab' */ 'components/tabs/antd'), {loading: () => <Loader />, ssr: false} )
const Admin = dynamic(import(/* webpackChunkName: 'admin' */ 'modules/user/components/admin'), {ssr: false, loading: () => <Loader />})
const Semester = dynamic(import(/* webpackChunkName: 'semester' */ 'modules/edu/containers'), {ssr: false, loading: () => <Loader />})
const GoogleLogin = dynamic(import('components/auth/google-login'))

const items = [
  { header: 'Planning', icon: 'calendar', component: <Semester />},
  { header: 'Attendance', icon: 'attendance', component: <Attendance />},
  { header: 'User', component: <Admin />}
]

const IndexPage = ({t}) => {
  return (
    <Tab 
      items={items} 
      extra={<GoogleLogin />} 
      position="top"
    />
  )
}

export default withI18next(['common', 'report', 'timetables', 'admin'])(
  withMultipleInitialProps([
    getAdminProps,
    getEduProps,    
  ])(IndexPage)
)
