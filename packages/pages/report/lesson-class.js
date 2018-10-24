import { memo } from 'react'
import {QueryAllLessonClass as query} from 'pages/report/lesson-class.gql'
import AppLayout from 'containers/layouts/app'
import LessonClassReport from 'modules/report/lesson-class'
import { withNamespaces } from 'react-i18next'
import { compose } from 'recompose'
export const getIndexProps = async ({apolloClient}) => {
  const { data } = await apolloClient.query({query})

  return { data }
}

const LessonClassPage = ({t, data}) =>
  <AppLayout
    title={t('report.v_all_lesson_class')}
    description={t('report.v_all_lesson_class')}
  >        
    <LessonClassReport data={data} />
  </AppLayout>

export default compose(
  memo,
  withNamespaces(['report'])
)(LessonClassPage)