import { compose } from 'recompose'

import { withInitialProps } from 'lib/hocs/with-initial-props'
import { withI18next } from 'lib/hocs/with-i18next'

import LessonClass, { getIndexProps } from 'pages/report/lesson-class'

export default compose(
  withI18next(['report']),
  withInitialProps(getIndexProps),
)(LessonClass)
