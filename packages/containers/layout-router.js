import { withRouter } from 'next/router'
import withHead from 'containers/layouts/with-head'

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
      const AdminLayout = require('containers/layouts/admin').default
      return (
        <AdminLayout {...props}>
          {children}
        </AdminLayout>
      )
    default:
      const GuestLayout = require('containers/layouts/guest').default
      
      return (
        <GuestLayout {...props}>
          {children}
        </GuestLayout>
      )
  }
}

export default withHead(withRouter(LayoutRouter))
