import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import withAuth from 'containers/layouts/base'

const LayoutRouter = ({router, children, ...props}) => {
  switch (router.pathname) {
    case '/admin':
    case '/profile':
    case '/report':
    case '/report/lesson_class':
      const AdminLayout = dynamic(import('containers/layouts/admin'))
      return (
        <AdminLayout {...props}>
          {children}
        </AdminLayout>
      )
    default:
      const GuestLayout = dynamic(import('containers/layouts/guest'))
      return (
        <GuestLayout {...props}>
          {children}
        </GuestLayout>
      )
  }
}

export default withAuth(withRouter(LayoutRouter))
