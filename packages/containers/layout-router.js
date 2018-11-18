import { withRouter } from 'next/router'
import withHead from 'containers/layouts/with-head'
import dynamic from 'next/dynamic'
const AdminLayout = dynamic(import('containers/layouts/admin'))
const GuestLayout = dynamic(import('containers/layouts/guest'))
const LayoutRouter = ({router, children, ...props}) => {
  switch (router.pathname) {
    case '/admin':
    case '/profile':
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
      return (
        <AdminLayout {...props}>
          {children}
        </AdminLayout>
      )
    default:
      return (
        <GuestLayout {...props}>
          {children}
        </GuestLayout>
      )
  }
}

export default withHead(withRouter(LayoutRouter))
