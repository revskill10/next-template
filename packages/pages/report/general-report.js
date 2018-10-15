import {QueryGeneralReport as query} from 'pages/report/general-report.gql'
import AppLayout from 'containers/layouts/app'
import GeneralReportModule from 'modules/report/general-report'
import { withI18next } from 'lib/with-i18next'

export const getIndexProps = async ({apolloClient}) => {
  const { data } = await apolloClient.query({query})

  return { data }
}

const GeneralReportPage = ({t, data}) =>
  <AppLayout
    title={t('v_general_report_in_week')}
    description={t('v_general_report_in_week')}
  >
    <GeneralReportModule data={data} />
  </AppLayout>

export default withI18next(['common'])(GeneralReportPage)
