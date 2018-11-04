import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'

const SideBar = ({router}) => {
  switch (router.pathname) {
    case '/':
    case '/report':
    case '/report/lesson_class':
      const ReportSideBar = dynamic(import('containers/layouts/admin/sidebars/report-sidebar'))
      return <ReportSideBar />
    default:
      return null
  }
}

export default withRouter(SideBar)
