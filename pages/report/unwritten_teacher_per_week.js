import ReportIndex, { getIndexProps } from 'modules/report/components/unwritten-teacher-per-week'
import { withInitialProps } from 'lib/hocs/with-initial-props'
import { withI18next } from 'lib/hocs/with-i18next'
import { compose } from 'recompose'
export default compose(
  withI18next(['report']),
  withInitialProps(getIndexProps),
)(ReportIndex)
