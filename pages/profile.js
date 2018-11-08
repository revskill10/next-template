import AppLayout from 'containers/layout-router'
import UserTest from 'components/auth/user-info'
const Profile = () => {
  return (
    <AppLayout
    title={'Profile'}
    description='Simple things'
  >
    <>
      <UserTest />
    </>
    </AppLayout>
  )
}

export default Profile
