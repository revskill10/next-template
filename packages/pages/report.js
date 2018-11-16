import { memo, useState, useContext } from 'react'
import convertDataToArray from 'lib/utils/convert-data-to-array'
import { compose } from 'recompose'
import dynamic from 'next/dynamic'
import { withNamespaces } from 'react-i18next'
import {allow, VIEW_QLGD_REPORT} from 'lib/policies'
import withContextProvider from 'lib/hocs/with-context-provider'
import moveItemToFirst from 'lib/utils/move-item-to-first'
// layout + routing
import Layout from 'containers/layout-router'
import Grid from 'pages/report.grid'
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
// context
import {
  ReportPageContext,
  MetaContext,
} from 'containers/contexts'
// shared components
import LiveComponent from 'containers/live-component'
import DataTable from 'components/datatables/mui'


export const getIndexProps = async ({apolloClient, currentUser}) => {
  if (allow(currentUser, VIEW_QLGD_REPORT)) {
    try {
      const {data} = await apolloClient.query({query: FullPageQuery})
      return {
        meta: data.meta
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const LineChartWrapper = () => {
  const [showChart, setShowChart] = useState(false)
  let LineChart = null

  if (showChart) {
    LineChart = LineChart || dynamic(import('components/charts/line-chart'))
  }

  const onClick = () => {
    if (showChart) {
      setShowChart(false)
    } else {
      setShowChart(true)
    }
  }

  const label = showChart ? 'Hide chart' : 'Show chart'

  return (
    <>
      {showChart ? <LineChart /> : null }
      <button onClick={onClick}>{label}</button>
    </>
  )
}

const DataTableWrapper = ({t}) => {
  const {v_general_report_in_week} = useContext(ReportPageContext)
  const {meta} = useContext(MetaContext)
  
  const keys = meta.fields.map(item => {
    return item.name
  })

  const sortedKeys = moveItemToFirst(keys, 'tuan')
  const shownKeys = sortedKeys.slice(0, 7)
  const hiddenKeys = sortedKeys.slice(7, sortedKeys.length)
  const columns = shownKeys.map(item => {
    const tmp = `${GENERAL_REPORT_IN_WEEK_KEY}.${item}`
    return t(tmp)
  }).concat(hiddenKeys.map(item => {
    const tmp = `${GENERAL_REPORT_IN_WEEK_KEY}.${item}`
    return {
      name: t(tmp),
      options: {
        display: false
      }
    }
  }))

  const title=t(GENERAL_REPORT_IN_WEEK)
  const data = convertDataToArray(v_general_report_in_week, sortedKeys)
  return (
    <DataTable data={data} columns={columns} title={title} />
  )
}

const Page = ({t}) => {
  const TranslatedDataTableWrapper = withNamespaces(['report'])(DataTableWrapper)
  return (
    <Layout
      title={t(GENERAL_REPORT_IN_WEEK)}
      description={t(GENERAL_REPORT_IN_WEEK)}
    >
      <>
        <LineChartWrapper />
        <LiveComponent
          allowedPermissions={[VIEW_QLGD_REPORT]}
          query={query}
          subscription={subscription}
          context={ReportPageContext}
        >
          <Grid>
            <TranslatedDataTableWrapper />
          </Grid>
        </LiveComponent>
      </>
    </Layout>
  )
}
  

export default compose(
  withContextProvider(MetaContext.Provider),
  memo,
  withNamespaces(['report'])
)(Page)
