import Tabs from 'modules/edu/containers/tabs'
import dynamic from 'next/dynamic'
const NewAge = dynamic(import('modules/edu/components/new-age')) 
const NewActivity = dynamic(import('modules/edu/components/new-activity'))

export default () => {
  const items = [
    {
      header: 'New Age',
      component: <NewAge />
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
