import {compose} from 'recompose'
import { createContext, memo, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import Shared from 'pages/report/shared'
import {
  DETAIL_ABSENT_STUDENT,
  DETAIL_ABSENT_STUDENT_KEY,
} from 'lib/i18n/translations'

const namespaces=['report']
const dataKey='v_detail_student_absent_in_week'
const titleKey=DETAIL_ABSENT_STUDENT
const descriptionKey=DETAIL_ABSENT_STUDENT
const i18nKey=DETAIL_ABSENT_STUDENT_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const tableContext = createContext(dataKey)
const columns = [
  'tuan',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'so_tiet_vang',
  'thu',
  'thoi_gian',
  'ma_lop',
  'ma_mon_hoc',
  'ten_mon_hoc',
  'tengiangvien',
  'don_vi',
]
const displayColumns = [
  'tuan',
  'masinhvien',
  'hoten',
  'ma_lop_hanh_chinh',
  'so_tiet_vang',
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
