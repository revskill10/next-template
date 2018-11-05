import AppLayout from 'containers/layout-router'
import DndTest from 'components/dnd-test'
import AgTest from 'components/datatables/ag-test'
import UserTest from 'components/auth/user-info'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const IndexPage = () => {
  return (
    <AppLayout
      title='Home page'
      description='Simple things'
    >
      <>
      <UserTest />
      <div
        id="grid1"
        className="ag-theme-balham"
        style={{ marginTop: '10px', height: '20rem', width: '100%' }}
      >
        <AgTest />
      </div>
      <DndTest />
      </>
    </AppLayout>
  )
}
  

export default IndexPage
