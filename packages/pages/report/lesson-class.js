import {QueryAllLessonClass as query} from 'pages/report/lesson-class.gql'
import AppLayout from 'containers/layouts/app'
import LessonClassReport from 'modules/report/lesson-class'
import { withI18next } from 'lib/with-i18next'

export const getIndexProps = async ({apolloClient}) => {
  const { data } = await apolloClient.query({query})

  return { data }
}

const LessonClassPage = ({t, data}) =>
  <AppLayout
    title={t('v_all_lesson_class')}
    description={t('v_all_lesson_class')}
  >        
    <LessonClassReport data={data} />
  </AppLayout>

export default withI18next(['common'])(LessonClassPage)