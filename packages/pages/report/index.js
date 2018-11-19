import {compose} from 'recompose'
import { createContext, memo, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import Shared from 'pages/report/shared'
import {
  GENERAL_REPORT_IN_WEEK,
  GENERAL_REPORT_IN_WEEK_KEY,
} from 'lib/i18n/translations'

const namespaces=['report']
const dataKey='v_general_report_in_week'
const titleKey=GENERAL_REPORT_IN_WEEK
const descriptionKey=GENERAL_REPORT_IN_WEEK
const i18nKey=GENERAL_REPORT_IN_WEEK_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const tableContext = createContext(dataKey)
const columns = [
  'tuan',
  'total_class',
  'total_lesson_class',
  'total_student_absent',
  'total_teacher_do_not_finish_in_week',
  'total_teacher_in_week',
  'total_times_student_absent',
  'total_times_teacher_add',
  'total_times_teacher_do_not_write',
  'total_times_teacher_retired',
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

