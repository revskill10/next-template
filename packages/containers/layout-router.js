import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import withHead from 'containers/layouts/with-head'

const LayoutRouter = ({router, children, ...props}) => {
  switch (router.pathname) {
    case '/admin':
    case '/profile':
    case '/report':
    case '/report/lesson_class':
      //const AdminLayout = dynamic(import('containers/layouts/admin'))
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
