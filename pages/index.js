import IndexPage from 'pages/index'
import { withI18next } from 'lib/hocs/with-i18next'
import {compose} from 'recompose'
export default compose(
  withI18next(['common', 'report']),
)(IndexPage)
