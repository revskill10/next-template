import { memo } from 'react'
import Layout from 'containers/layouts/app'
import GeneralReportModule from 'modules/report/general-report'
import { withNamespaces } from 'react-i18next'
import { compose } from 'recompose'
import Authorization from 'containers/authorization'
import LiveComponent from 'containers/live-component'
import {
  QueryGeneralReport as query, 
  SubscribeGeneralReport as subscription
} from 'modules/report/general-report.gql'
import Suspense from 'containers/suspense'

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
        <Suspense loadPath={() => import('components/charts/line-chart')} />
            
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
