import AppLayout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr'

const Profile = () => {
  const UserTest = dynamic(import(/* webpackChunkName: 'user-info-card' */ 'components/blocks/user-info-card'), { ssr: false })
  return (
    <AppLayout
    title={'Profile'}
    description='Simple things'
  >
    <NoSSR>
      <UserTest />
    </NoSSR>
    </AppLayout>
  )
}

export default Profile
