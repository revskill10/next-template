import "antd/dist/antd.css";
import Collapse from 'modules/edu/containers/collapse'
import Semester from 'modules/edu/components/semester'
import Toolbar from 'modules/edu/containers/toolbar'
import SchoolYears from 'modules/edu/components/school-years'
import Ages from 'modules/edu/components/ages'
import {usePageContext} from 'modules/edu/contexts'

const Main = () => {
  const {sche_school_years, sche_ages} = usePageContext()
  const items = [
    {
      header: 'Actions',
      component: <Toolbar  />
    },
    {
      header: 'Ages',
      component: <Ages ages={sche_ages} />
    },
    {
      header: 'School Years',
      component: <SchoolYears school_years={sche_school_years} />
    },
    
  ]
  
  return (
    <Collapse 
      items={items}
    />
  )
}

export default Main