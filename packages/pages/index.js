import AppLayout from 'containers/layout-router'
import DndTest from 'components/dnd-test'
import UserTest from 'components/auth/user-info'

const IndexPage = () => {
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
    >
      <>
      <UserTest />
      <DndTest />
      </>
    </AppLayout>
  )
}
  

export default IndexPage
