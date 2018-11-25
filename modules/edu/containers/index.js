import "antd/dist/antd.css";
import Collapse from 'modules/edu/containers/collapse'
import Semester from 'modules/edu/components/semester'
import Toolbar from 'modules/edu/containers/toolbar'
import {insertAgeClientMutation} from 'modules/edu/fragments/ages.gql.js'
import {graphql} from 'react-apollo'
import {compose} from 'recompose'
const Main = ({createAge}) => {
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
  const mutations = {
    createAge,
  }
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

export default compose(
  graphql(insertAgeClientMutation, {name: 'createAge'}),
)(Main)