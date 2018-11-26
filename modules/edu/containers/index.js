import "antd/dist/antd.css";
import Collapse from 'modules/edu/containers/collapse'
import Semester from 'modules/edu/components/semester'
import Toolbar from 'modules/edu/containers/toolbar'
import useMutations from 'lib/hooks/mutations'
import {
  pageMutation
} from 'modules/edu/fragments'

const Main = () => {
  const {mutations} = useMutations(pageMutation)

  const ages = [
    {
      key: 1,
      id: 1,
      name: 'Mam'
    },
    {
      key: 2,
      id: 2,
      name: 'Choi'
    }
  ]
  
  const items = [
    {
      header: 'Actions',
      component: <Toolbar mutations={mutations} />
    },
    {
      header: 'Semester',
      component: <Semester ages={ages} />
    }
  ]
  
  return (
    <Collapse 
      items={items}
    />
  )
}

export default Main