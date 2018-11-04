import { memo } from 'react'
import Layout from 'containers/layout-router'
import GeneralReportModule from 'modules/report/general-report'
import { withNamespaces } from 'react-i18next'
import { compose } from 'recompose'
import Authorization from 'containers/authorization'
import LiveComponent from 'containers/live-component'
import {
  QueryGeneralReport as query, 
  SubscribeGeneralReport as subscription
} from 'modules/report/general-report.gql'
//import dynamic from 'next/dynamic'
//const LineChart = dynamic(import('components/charts/line-chart'))
import LineChart from 'components/charts/line-chart'

export const getIndexProps = async ({apolloClient, currentUser}) => {
  try {
    if (currentUser.permissions.includes('view:qlgd_report')) {
      await apolloClient.query({query})
    }  
  }  catch (e) {
    console.log(`error general report: ${e}`)
  }
}

const GeneralReportPage = ({t}) => {
  return (
    <Layout
      title={t('report.v_general_report_in_week')}
      description={t('report.v_general_report_in_week')}
    >
      <>
        <LineChart />
            
        <Authorization
          secure
          allowedPermissions={['view:qlgd_report']}
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
