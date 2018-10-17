import AppLayout from 'containers/layouts/app'
import Link from 'components/link'
import Divider from "@material-ui/core/Divider";

const IndexPage = () =>
  <AppLayout
    title='Blog'
    description='Simple blog'
  >
    Welcome to blog
    <Divider />
    <Link href='/blog/post-1'>Post 1</Link>
  </AppLayout>

export default IndexPage
