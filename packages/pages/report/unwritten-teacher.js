import {compose} from 'recompose'
import { createContext, memo, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import Shared from 'pages/report/shared'
// i18n 
import {
  UNWRITTEN_TEACHER,
  UNWRITTEN_TEACHER_KEY,
} from 'lib/i18n/translations'

const namespaces=['report']
const dataKey='v_all_teacher_do_not_write'
const titleKey=UNWRITTEN_TEACHER
const descriptionKey=UNWRITTEN_TEACHER
const i18nKey=UNWRITTEN_TEACHER_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const tableContext = createContext(dataKey)
const columns = [
  'tuan',
  'thu',
  'thoi_gian',
  'code',
  'tengiangvien',
  'donvi',
  'ma_lop',
  'ten_mon_hoc',
  'phong',
  'ma_mon_hoc',
  'trangthai',
  'tiet_bat_dau',
  'so_tiet',
]
const displayColumns = [
  'tuan',
  'thu',
  'thoi_gian',
  'code',
  'tengiangvien',
  'donvi',
  'ma_lop',
  'ten_mon_hoc',
  'phong',
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

