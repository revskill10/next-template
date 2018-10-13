import React from 'react'
import AppLayout from 'containers/layouts/app'
import DataTable from 'modules/report'
import LiveComponent from 'containers/cache-component'
import {QueryAllLessonClass as query, SubscribeAllLessonClass as subscription} from 'data/graphql/v_all_lesson_class.gql'
import { compose } from 'recompose'
import { withI18next } from 'lib/with-i18next'
import Head from 'next/head'

const Index = ({t, v_all_lesson_class}) =>
  <React.Fragment>
  <Head>
    <title>{t ? t('title.home') : 'Home' }</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <AppLayout>
    <h1>Danh sách buổi học theo tuần: </h1>
    
    <LiveComponent
      cache={v_all_lesson_class}
      subscription={subscription}
    >{DataTable}</LiveComponent>
  </AppLayout>
  </React.Fragment>


Index.getInitialProps = async ({ apolloClient }) => {
  const tuans = await apolloClient.query({query})

  return {v_all_lesson_class: tuans.data}
}

export default compose(
  withI18next(['common']),
)(Index)