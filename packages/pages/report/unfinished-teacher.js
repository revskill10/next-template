import {compose} from 'recompose'
import { createContext, memo, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import Shared from 'pages/report/shared'
import {
  UNFINISHED_TEACHER,
  UNFINISHED_TEACHER_KEY,
} from 'lib/i18n/translations'

const namespaces=['report']
const dataKey='v_all_teacher_do_not_finish'
const titleKey=UNFINISHED_TEACHER
const descriptionKey=UNFINISHED_TEACHER
const i18nKey=UNFINISHED_TEACHER_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const tableContext = createContext(dataKey)
const columns = [
  'tuan',
  'donvi',
  'thu',
  'thoi_gian',
  'tengiangvien',
  'ten_mon_hoc',
  'phong',
  'ma_lop',
  'ma_mon_hoc',
  'code',
  'trangthai',
  'tiet_bat_dau',
  'so_tiet',
]
const displayColumns = [
  'tuan',
  'donvi',
  'thu',
  'thoi_gian',
  'tengiangvien',
  'ten_mon_hoc',
  'phong',
  'ma_lop',
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
