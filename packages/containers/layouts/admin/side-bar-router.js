import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
const ReportSideBar = dynamic(import('containers/layouts/admin/sidebars/report-sidebar'))
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
    case '/report/absent_student_per_department':
    case '/report/always_absent_student':
    case '/report/unwritten_teacher_per_week':
    case '/report/total_teacher':
      return <ReportSideBar />
    default:
      return null
  }
}

export default withRouter(SideBar)
