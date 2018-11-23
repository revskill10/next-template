import { withRouter } from 'next/router'
import withHead from 'containers/layouts/with-head'
import dynamic from 'next/dynamic'
import Loader from 'components/loader'
//const AdminLayout = dynamic(import('containers/layouts/admin'), {loading: () => <Loader />})
const GuestLayout = dynamic(import('containers/layouts/guest'), {loading: () => <Loader />})
const LayoutRouter = ({children, ...props}) => {
  return (
    <GuestLayout {...props}>
      {children}
    </GuestLayout>
  )
}

export default withHead(LayoutRouter)
