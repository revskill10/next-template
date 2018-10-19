import LessonClass, { getIndexProps } from 'pages/report/lesson-class'
import { withInitialProps } from 'lib/with-initial-props'
import { withI18next } from 'lib/with-i18next'
import { compose } from 'recompose'

export default compose(
  withI18next(['common', 'report']),
  withInitialProps(getIndexProps),
)(LessonClass)
