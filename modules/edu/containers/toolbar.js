import Tabs from 'modules/edu/containers/tabs'
import dynamic from 'next/dynamic'
const NewAge = dynamic(import('modules/edu/components/new-age')) 
const NewActivity = dynamic(import('modules/edu/components/new-activity'))
const NewSchoolYear = dynamic(import('modules/edu/components/new-school-year'))

export default () => {
  const items = [
    {
      header: 'Ages',
      component: <NewAge />
    },
    {
      header: 'School Years',
      component: <NewSchoolYear />
    },
    {
      header: 'New Activity',
      component: <NewActivity />
    },
  ]
  return (
    <Tabs items={items} />
  )
}
