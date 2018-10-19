import {QueryGeneralReport as query} from 'pages/report/general-report.gql'
import AppLayout from 'containers/layouts/app'
import GeneralReportModule from 'modules/report/general-report'
import { withNamespaces } from 'react-i18next'
import LineChart from 'components/charts/line-chart'
export const getIndexProps = async ({apolloClient}) => {
  const { data } = await apolloClient.query({query})

  return { data }
}

const GeneralReportPage = ({t, data}) =>
  <AppLayout
    title={t('report.v_general_report_in_week')}
    description={t('report.v_general_report_in_week')}
  >
    <>
      <div style={{height: '400px'}}>
        <LineChart />
      </div>
      <GeneralReportModule data={data} />
    </>
  </AppLayout>

export default withNamespaces(['report'])(GeneralReportPage)
