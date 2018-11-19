import {memo} from 'react'
import Layout from 'containers/layout-router'
import dynamic from 'next/dynamic'

const Grid = dynamic(import('components/grids/report'))
const LiveComponent = dynamic(import('containers/live-component'))
const DataTable = dynamic(import('components/datatables/mui-wrapper'))


const Shared = ({
  t, titleKey, descriptionKey, allowedPermissions, tableContext, namespaces, dataKey, i18nKey, columns, query, subscription, displayColumns
}) => {
  
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

export default memo(Shared)