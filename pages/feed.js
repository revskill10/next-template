import dynamic from 'next/dynamic'
import Loader from 'components/loader'

const Layout = dynamic(import(/* webpackChunkName: 'layout' */ 'containers/layouts/guest' ))
const Tab = dynamic(import(/* webpackChunkName: 'tab' */ 'components/tabs/guest'), {loading: () => <Loader />} )
const Feed = dynamic(import(/* webpackChunkName: 'feed' */ 'modules/timeline/components/timeline'), {ssr: false, loading: () => <Loader />} )
const items = [
  { label: 'Timeline', component: Feed},
]

const Page = () => {
  return (
    <Layout
      title="Feed"
      description="Feed"
    >
      <Tab items={items} />
    </Layout>
  )
}

export default Page
