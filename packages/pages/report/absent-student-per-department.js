import {compose} from 'recompose'
import { createContext, memo, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import Shared from 'pages/report/shared'
const {
  ABSENT_STUDENT_PER_DEPARTMENT,
  ABSENT_STUDENT_PER_DEPARTMENT_KEY,
} = require('lib/i18n/translations')

const namespaces=['report']
const titleKey=ABSENT_STUDENT_PER_DEPARTMENT
const descriptionKey=ABSENT_STUDENT_PER_DEPARTMENT
const i18nKey=ABSENT_STUDENT_PER_DEPARTMENT_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const dataKey='v_total_student_absent_department_in_week'
const tableContext = createContext(dataKey)
const columns = [
  'tuan',
  'ten_khoa',
  'slg_sv_vang',
]
const displayColumns = columns
const query = mkQuery('query', columns, dataKey)
const subscription = mkQuery('subscription', columns, dataKey)

export const getIndexProps = async ({req, apolloClient, currentUser}) => {
  const query = mkQuery('query', columns, dataKey)
  let fetchPolicy = req ? { fetchPolicy: 'network-only' } : { fetchPolicy: 'cache-first' }
  if (allow(currentUser, allowedPermissions[0])) {
    await apolloClient.query({query, ...fetchPolicy})
  } 
}

const Page = ({t}) => {
  return (
    <Shared
      titleKey={titleKey} 
      descriptionKey={descriptionKey} 
      allowedPermissions={allowedPermissions}      
      tableContext={tableContext}
      namespaces={namespaces}
      dataKey={dataKey}
      i18nKey={i18nKey}
      columns={columns}
      query={query}
      subscription={subscription}
      displayColumns={displayColumns}
      t={t}
    />
  )
}

export default compose(
  memo,
  withNamespaces(['report'])
)(Page)