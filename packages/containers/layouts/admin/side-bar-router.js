import { withRouter } from 'next/router'

const SideBar = ({router}) => {
  switch (router.pathname) {
    case '/':
    case '/report':
    case '/report/lesson_class':
    case '/report/unfinished_teacher':
    case '/report/unwritten_teacher':
    case '/report/additional_hour':
    case '/report/retire':
    case '/report/absent_student':
    case '/report/detail_absent_student':
      //const ReportSideBar = dynamic(import('containers/layouts/admin/sidebars/report-sidebar'))
      const ReportSideBar = require('containers/layouts/admin/sidebars/report-sidebar').default
      return <ReportSideBar />
    default:
      return null
  }
}

export default withRouter(SideBar)
