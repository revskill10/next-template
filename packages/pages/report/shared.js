import {memo, createContext} from 'react'
import Layout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import { withNamespaces } from 'react-i18next'
import { compose } from 'recompose'
import {allow} from 'lib/policies'
import mkQuery from 'lib/utils/mk-query'
import {VIEW_QLGD_REPORT} from 'lib/policies'
const Grid = dynamic(import('components/grids/report'))
const LiveComponent = dynamic(import('containers/live-component'))
const DataTable = dynamic(import('components/datatables/mui-wrapper'))

export const makeInitialProps = (columns, dataKey, allowedPermissions=[VIEW_QLGD_REPORT]) => {
  const query = mkQuery('query', columns, dataKey)
  const subscription = mkQuery('subscription', columns, dataKey)
  return {
    getIndexProps: async ({req, apolloClient, currentUser}) => {
      let fetchPolicy = req ? { fetchPolicy: 'network-only' } : { fetchPolicy: 'cache-first' }
      if (allow(currentUser, allowedPermissions[0])) {
        await apolloClient.query({query, ...fetchPolicy})
      }
    },
    query,
    subscription,
  }
}

const Shared = ({
  t, titleKey, descriptionKey, allowedPermissions=[VIEW_QLGD_REPORT], namespaces=['report'], dataKey, i18nKey, columns, query, subscription, displayColumns
}) => {
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
            i18nKey={i18nKey}
            columns={columns}
            displayColumns={displayColumns}
          />
        </LiveComponent>
      </Grid>
    </Layout>
  )
}

export default compose(
  memo,
  withNamespaces(['report'])
)(Shared)