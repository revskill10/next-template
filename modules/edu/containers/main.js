import {memo} from 'react'
import dynamic from 'next/dynamic'

import Collapse from 'modules/edu/containers/collapse'
import Toolbar from 'modules/edu/containers/toolbar'
import Tab from 'modules/edu/containers/tabs'
import {usePageContext} from 'modules/edu/contexts'
/*
import Semesters from 'modules/edu/components/semesters'
import SchoolYears from 'modules/edu/components/school-years'
import Classrooms from 'modules/edu/components/classrooms'
import Ages from 'modules/edu/components/ages'
import Terms from 'modules/edu/components/terms'
*/

const Semesters = dynamic(import('modules/edu/components/semesters'))
const SchoolYears = dynamic(import('modules/edu/components/school-years'))
const Classrooms = dynamic(import('modules/edu/components/classrooms'))
const Ages = dynamic(import('modules/edu/components/ages'))
const Terms = dynamic(import('modules/edu/components/terms'))
const Weeks = dynamic(import('modules/edu/components/weeks'))

const Main = () => {
  const {
    sche_school_years, 
    sche_ages, 
    sche_classrooms,
    sche_semesters,
    sche_terms,
    sche_weeks,
  } = usePageContext()

  const tabItems = [
    {
      header: 'Ages',
      component: <Ages ages={sche_ages} />
    },
    {
      header: 'School Years',
      component: <SchoolYears school_years={sche_school_years} />
    },
    {
      header: 'Classrooms',
      component: <Classrooms classrooms={sche_classrooms} />
    },
    {
      header: 'Semesters',
      component: <Semesters semesters={sche_semesters} />
    },
    {
      header: 'Terms',
      component: <Terms terms={sche_terms} />
    },
    {
      header: 'Weeks',
      component: <Weeks weeks={sche_weeks} />
    },
  ]

  const collapseItems = [
    {
      header: 'Actions',
      component: <Toolbar  />
    },
    {
      header: 'Views',
      component: <Tab tabPosition="left" items={tabItems} />
    }
  ]
  
  return (
    <Collapse 
      items={collapseItems}
    />
  )
}

export default memo(Main)