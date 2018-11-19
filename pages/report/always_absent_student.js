import ReportIndex, { getIndexProps } from 'pages/report/always-absent-student'
import { withInitialProps } from 'lib/hocs/with-initial-props'
import { withI18next } from 'lib/hocs/with-i18next'
import { compose } from 'recompose'
export default compose(
  withI18next(['report']),
  withInitialProps(getIndexProps),
)(ReportIndex)
