import { memo, createContext } from 'react'
import { compose } from 'recompose'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import withContextProvider from 'lib/hocs/with-context-provider'
// layout + routing
import Layout from 'containers/layout-router'
import Grid from 'components/grids/report'
// i18n 
import {
  ALWAYS_ABSENT_STUDENT,
  ALWAYS_ABSENT_STUDENT_KEY,
} from 'lib/i18n/translations'
// gql
import {
  FullPageQuery,
  alwaysAbsentStudentQuery as query, 
  alwaysAbsentStudentSubscription as subscription
} from 'pages/report/always-absent-student.gql'

// shared components
import LiveComponent from 'containers/live-component'
import DataTable from 'components/datatables/mui-wrapper'

const namespaces=['report']
const dataKey='v_total_student_absent_greater_20_percent'
const titleKey=ALWAYS_ABSENT_STUDENT
const descriptionKey=ALWAYS_ABSENT_STUDENT
const i18nKey=ALWAYS_ABSENT_STUDENT_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const metaContext = createContext(titleKey)
const tableContext = createContext(dataKey)
const firstKey='v_total_student_absent_greater_20_percent'

export const getIndexProps = async ({apolloClient, currentUser}) => {
  if (allow(currentUser, allowedPermissions[0])) {
    const {data} = await apolloClient.query({query: FullPageQuery})
    return {
      meta: data.meta
    }
  }
}

const Page = ({t}) => {
  return (
    <Layout
      title={t(titleKey)}
      description={t(descriptionKey)}
    >
      <Grid>
        <LiveComponent
          allowedPermissions={allowedPermissions}
          query={query}
          subscription={subscription}
          context={tableContext}
        >
          <DataTable 
            namespaces={namespaces}
            dataKey={dataKey}
            tableContext={tableContext}
            metaContext={metaContext}
            i18nKey={i18nKey}
            firstKey={firstKey}
          />
        </LiveComponent>
      </Grid>
    </Layout>
  )
}
  
export default compose(
  withContextProvider(metaContext),
  memo,
  withNamespaces(namespaces)
)(Page)
