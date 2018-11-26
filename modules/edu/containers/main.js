import "antd/dist/antd.css";
import Collapse from 'modules/edu/containers/collapse'
import Semester from 'modules/edu/components/semester'
import Toolbar from 'modules/edu/containers/toolbar'

const Main = () => {
  const items = [
    {
      header: 'Actions',
      component: <Toolbar  />
    },
    {
      header: 'Semester',
      component: <Semester />
    }
  ]
  
  return (
    <Collapse 
      items={items}
    />
  )
}

export default Main