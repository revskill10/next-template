import AppLayout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import Grid from 'pages/profile.grid'

const Profile = () => {
  const UserTest = dynamic(import(/* webpackChunkName: 'user-info-card' */ 'components/auth/user-info'), { ssr: false })
  
  return (
    <AppLayout
      title={'Profile'}
      description='Simple things'
      meta={<meta property="og:title" content="FB post title" class={''} />}
    >
      <Grid 
        left={<div>Left</div>}
        middle={<UserTest />}
        right={<div>Right</div>} />
    </AppLayout>
  )
}

export default Profile
