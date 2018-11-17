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
  TOTAL_TEACHER,
  TOTAL_TEACHER_KEY,
} from 'lib/i18n/translations'
// gql
import {
  FullPageQuery,
  totalTeacherQuery as query, 
  totalTeacherSubscription as subscription
} from 'pages/report/total-teacher.gql'

// shared components
import LiveComponent from 'containers/live-component'
import DataTable from 'components/datatables/mui-wrapper'

const namespaces=['report']
const dataKey='v_total_teacher_in_week'
const titleKey=TOTAL_TEACHER
const descriptionKey=TOTAL_TEACHER
const i18nKey=TOTAL_TEACHER_KEY
const allowedPermissions=[VIEW_QLGD_REPORT]
const metaContext = createContext(titleKey)

export const getIndexProps = async ({apolloClient, currentUser}) => {
  if (allow(currentUser, allowedPermissions[0])) {
    const {data} = await apolloClient.query({query: FullPageQuery})
    return {
      meta: data.meta
    }
  }
}

const Page = ({t}) => {
  const tableContext = createContext(dataKey)
  
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
