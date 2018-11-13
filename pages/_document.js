import { withDocument } from 'lib/hocs/with-document';
import Document from 'containers/next-document';
import {compose} from 'recompose'
import { withI18next } from 'lib/hocs/with-i18next'
export default compose(
  withDocument,
  withI18next(),
)(Document)
