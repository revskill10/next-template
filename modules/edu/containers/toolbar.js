import Tabs from 'modules/edu/containers/tabs'
import dynamic from 'next/dynamic'
const NewAge = dynamic(import('modules/edu/components/new-age')) 
const NewClassRoom = dynamic(import('modules/edu/components/new-classroom'))
const NewSchoolYear = dynamic(import('modules/edu/components/new-school-year'))
const NewSemester = dynamic(import('modules/edu/components/new-semester'))
const NewTerm = dynamic(import('modules/edu/components/new-term'))
const NewWeek = dynamic(import('modules/edu/components/new-week'))

export default () => {
  const items = [
    {
      header: 'Age',
      component: <NewAge />,
    },
    {
      header: 'School Year',
      component: <NewSchoolYear />,
    },
    {
      header: 'ClassRoom',
      component: <NewClassRoom />,
    },
    {
      header: <div>Semester</div>,
      component: <NewSemester />,
    },
    {
      header: <div>Week</div>,
      component: <NewWeek />,
    }
  ]
  return (
    <Tabs items={items} />
  )
}
