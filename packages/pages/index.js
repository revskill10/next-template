import {QueryAllLessonClass as query} from 'pages/index.gql'
import AppLayout from 'containers/layouts/app'
import Report from 'modules/report'

export const getIndexProps = async ({apolloClient}) => {
  const { data } = await apolloClient.query({query})

  return { data }
}

const Index = ({t, data}) =>
  <AppLayout
    title={t ? t('title.home') : 'Home' }
    description={t ? t('description.home') : 'HPU Reporting'}
  >        
    <Report data={data} />
  </AppLayout>

export default Index