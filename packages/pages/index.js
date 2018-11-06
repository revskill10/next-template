import AppLayout from 'containers/layout-router'
import DndTest from 'components/dnd-test'
import UserTest from 'components/auth/user-info'
import dynamic from 'next/dynamic'

const IndexPage = () => {
  const Datatable = dynamic(import('components/charts/datatable'))
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
    >
      <>
      <UserTest />
      <Datatable />
      <DndTest />
      </>
    </AppLayout>
  )
}
  

export default IndexPage
