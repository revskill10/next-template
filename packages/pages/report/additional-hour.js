import {compose} from 'recompose'
import { createContext, memo, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import Shared from 'pages/report/shared'
const {
  ADDITIONAL_HOUR,
  ADDITIONAL_HOUR_KEY,
} = require('lib/i18n/translations')

const namespaces=['report']
const titleKey=ADDITIONAL_HOUR
const descriptionKey=ADDITIONAL_HOUR
const i18nKey=ADDITIONAL_HOUR_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const dataKey='v_detail_register_day_bo_sung'
const tableContext = createContext(dataKey)
const columns = [
  'tuan',
  'thoi_gian',
  'thu',
  'magv',
  'tengiangvien',
  'ten_khoa',
  'ma_lop',
  'ma_mon_hoc',
  'ten_mon_hoc',
  'phong',
  'trangthai',
  'tiet_bat_dau',
  'so_tiet',
  'note',
]
const displayColumns = [
  'tuan',
  'thoi_gian',
  'thu',
  'tengiangvien',
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
