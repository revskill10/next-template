import AppLayout from 'containers/layouts/app'
import Link from 'components/link'
import Divider from "@material-ui/core/Divider";
import { withI18next } from 'lib/hocs/with-i18next'
import gql from 'graphql-tag'

const query = gql`
  query{
    categories{
      name
      image{
        id
        handle
      }
      posts{
        title
        createdAt
        content
      }
    }
  }
`

const IndexPage = () =>
  <AppLayout
    title='Blog'
    description='Simple blog'
  >
    Welcome to blog
    <Divider />
    <Link href='/blog/post-1'>Post 1</Link>
  </AppLayout>

export default withI18next(['common', 'report'])(IndexPage)
