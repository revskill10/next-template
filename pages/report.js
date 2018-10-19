import ReportIndex, { getIndexProps } from 'pages/report/general-report'
import { withInitialProps } from 'lib/with-initial-props'
import { withI18next } from 'lib/with-i18next'
import { compose } from 'recompose'

export default compose(
  withI18next(['report']),
  withInitialProps(getIndexProps),
)(ReportIndex)
