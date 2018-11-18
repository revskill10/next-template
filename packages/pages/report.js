import { memo, createContext } from 'react'
import { compose } from 'recompose'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import withContextProvider from 'lib/hocs/with-context-provider'
// i18n 
import {
  GENERAL_REPORT_IN_WEEK,
  GENERAL_REPORT_IN_WEEK_KEY,
} from 'lib/i18n/translations'
// gql
import {
  FullPageQuery,
  GeneralReportQuery as query, 
  GeneralReportSubscription as subscription
} from 'pages/report.gql'

// shared components
import dynamic from 'next/dynamic'
// layout + routing
const Layout = dynamic(import('containers/layout-router'))
const Grid = dynamic(import('components/grids/report'))
const LiveComponent = dynamic(import('containers/live-component'))
const DataTable = dynamic(import('components/datatables/mui-wrapper'))
const namespaces=['report']
const dataKey='v_general_report_in_week'
const titleKey=GENERAL_REPORT_IN_WEEK
const descriptionKey=GENERAL_REPORT_IN_WEEK
const i18nKey=GENERAL_REPORT_IN_WEEK_KEY
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
