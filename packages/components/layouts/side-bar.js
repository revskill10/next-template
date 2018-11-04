import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'

const SideBar = ({router}) => {
  const ReportSideBar = dynamic(import('components/layouts/sidebars/report-sidebar'))
  switch (router.pathname) {
    case '/':
    case '/report':
    case '/report/lesson_class':
      return <ReportSideBar />
    default:
      return null
  }
}

export default withRouter(SideBar)
