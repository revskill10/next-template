import ReportIndex, { getIndexProps } from 'pages/report/detail-absent-student'
import { withInitialProps } from 'lib/hocs/with-initial-props'
import { withI18next } from 'lib/hocs/with-i18next'
import { compose } from 'recompose'
import dynamic from 'next/dynamic'
export default compose(
  withI18next(['report']),
  withInitialProps(getIndexProps),
)(ReportIndex)
