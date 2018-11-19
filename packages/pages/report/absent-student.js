import {compose} from 'recompose'
import { createContext, memo, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import Shared from 'pages/report/shared'
import {
  ABSENT_STUDENT,
  ABSENT_STUDENT_KEY,
} from 'lib/i18n/translations'

const namespaces=['report']
const dataKey='v_detail_student_absent_greater_20_percent'
const titleKey=ABSENT_STUDENT
const descriptionKey=ABSENT_STUDENT
const i18nKey=ABSENT_STUDENT_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const tableContext = createContext(dataKey)
const columns = [
  'stt',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'ma_lop',
  'ma_mon_hoc',
  'ten_mon_hoc',
  'tengiangvien',
  'tongtietvang',
  'sotietphanbo',
  'tyle',
]
const displayColumns = [
  'stt',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'ten_mon_hoc',
  'tongtietvang',
  'tengiangvien',
]
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
