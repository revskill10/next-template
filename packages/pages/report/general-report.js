import { memo, useState } from 'react'
import Layout from 'containers/layout-router'
import { withNamespaces } from 'react-i18next'
import { compose } from 'recompose'
import Authorization from 'containers/authorization'
import LiveComponent from 'containers/live-component'
import GeneralReportModule from 'modules/report/general-report'
import {
  QueryGeneralReport as query, 
  SubscribeGeneralReport as subscription
} from 'modules/report/general-report.gql'
import dynamic from 'next/dynamic'
import allow, {VIEW_QLGD_REPORT} from 'lib/policies'
import {GENERAL_REPORT_IN_WEEK} from 'lib/i18n/translations'

export const getIndexProps = async ({apolloClient, currentUser}) => {
  if (allow(currentUser, VIEW_QLGD_REPORT)) {
    await apolloClient.query({query})
  }
}

const GeneralReportPage = ({t}) => {
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
    <Layout
      title={t(GENERAL_REPORT_IN_WEEK)}
      description={t(GENERAL_REPORT_IN_WEEK)}
    >
      <>
        {showChart ? <LineChart /> : null }
        <button onClick={onClick}>{label}</button>
        <Authorization
          allowedPermissions={[VIEW_QLGD_REPORT]}
          >
          <LiveComponent
            query={query}
            subscription={subscription}
          >
            {GeneralReportModule}
          </LiveComponent>
        </Authorization>
      </>
    </Layout>
  )
}
  

export default compose(
  memo,
  withNamespaces(['report'])
)(GeneralReportPage)
