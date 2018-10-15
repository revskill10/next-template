import { compose } from 'recompose'
import { withI18next } from 'lib/with-i18next'
import ReportIndex, { getIndexProps } from 'pages/report/lesson-class'
import { withInitialProps } from 'lib/with-initial-props'

export default compose(
  withInitialProps(getIndexProps),
  withI18next(['common', 'report']),  
)(ReportIndex)
