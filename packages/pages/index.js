import AppLayout from 'containers/layouts/app'
import DndTest from 'components/dnd-test'
import AgTest from 'components/datatables/ag-test'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const IndexPage = () =>
  <AppLayout
    title='Home page'
    description='Simple things'
  >
  <div 
    id="myGrid"
    style={{
      boxSizing: "border-box",
      height: "100%",
      width: "100%"
    }}
    className="ag-theme-balham"    
  >
    <AgTest />
  </div>
    
    <DndTest />
    
  </AppLayout>

export default IndexPage
