import Admin, { getInitialProps } from 'modules/user/components/admin'
import {compose} from 'recompose'
import { withI18next } from 'lib/hocs/with-i18next'
import { withInitialProps } from 'lib/hocs/with-initial-props'
export default compose(
  withI18next(['common']),
  withInitialProps(getInitialProps)
)(Admin)
