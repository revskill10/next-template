import React from 'react'
import AppLayout from 'containers/layouts/app'
import DataTable from 'modules/report'
import LiveComponent from 'containers/cache-component'
import {SubscribeAllLessonClass as subscription} from 'data/graphql/v_all_lesson_class.gql'
import { compose } from 'recompose'
import { withI18next } from 'lib/with-i18next'
import getIndexData from 'lib/pages/index'

const Index = ({t, data}) =>
  <AppLayout
    title={t ? t('title.home') : 'Home' }
    description={t ? t('description.home') : 'HPU Reporting'}
  >
    <h1>Danh sách buổi học theo tuần: </h1>
    
    <LiveComponent
      cache={data}
      subscription={subscription}
    >{DataTable}</LiveComponent>
  </AppLayout>

Index.getInitialProps = async ({ apolloClient }) => {
  const data = await getIndexData(apolloClient)
  return data
}

export default compose(
  withI18next(['common']),
)(Index)