import {QueryGeneralReport as query} from 'pages/report/general-report.gql'
import AppLayout from 'containers/layouts/app'
import GeneralReportModule from 'modules/report/general-report'
import { inspect } from 'util'

export const getIndexProps = async ({apolloClient}) => {
  const { data } = await apolloClient.query({query})
  console.log(inspect(data))

  return { data }
}

const GeneralReportPage = ({t, data}) =>
  <AppLayout
    title={t ? t('v_general_report_in_week') : 'Report' }
    description={t ? t('v_general_report_in_week') : 'HPU Reporting'}
  >
    <GeneralReportModule data={data} />
  </AppLayout>

export default GeneralReportPage
