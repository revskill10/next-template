import React from 'react'
import App from 'layouts/App'
import Header from 'components/Header'
import LiveComponent from 'containers/liveContainer'
import { allPostsQuery, allPostsSubscription } from 'graphql/khoas.gql'
import { queryTuans as query } from 'graphql/tuans.gql'
import { queryTotalTeacherInWeek, subscribeTotalTeacherInWeek } from 'graphql/v_get_total_teacher_in_week.gql'
import {connect} from 'react-redux'
import { Flexrow, Flexcolumn } from 'layouts/Grid'
import { withI18next } from 'lib/with-i18next'
import { compose } from 'recompose'
import Head from 'next/head'
import { KhoasList, TuansList, TotalTeacherInWeek } from 'components/graphql/reporting'
import withConnectionType from 'lib/with-connection-type'
import NoSSR from 'react-no-ssr';

const Layout = ({tuans, connectionType}) =>
  <App>
    <Flexrow>
      <Flexcolumn size={12}>
        <Header />
      </Flexcolumn>
    </Flexrow>
    <Flexrow>
      <Flexcolumn size={6}>
        <React.Fragment>
          <h1>Danh sach khoa</h1>
          <LiveComponent query={allPostsQuery} subscription={allPostsSubscription}>
            {KhoasList}
          </LiveComponent>
        </React.Fragment>
      </Flexcolumn>
      <Flexcolumn size={6}>
        <React.Fragment>
          <h1>So luong giang vien trong tuan</h1>
          <LiveComponent query={queryTotalTeacherInWeek} subscription={subscribeTotalTeacherInWeek}>
            {TotalTeacherInWeek}
          </LiveComponent>
        </React.Fragment>
      </Flexcolumn>
    </Flexrow>  
    <Flexrow>
      <Flexcolumn size={8}>
        <React.Fragment>
          <h1>Danh sach Tuan</h1>
          <TuansList tuans={tuans} />
        </React.Fragment>
      </Flexcolumn>
      <Flexcolumn size={4}>
        <React.Fragment>
          <h1>4</h1>
          <NoSSR>
            Connection: {connectionType}
          </NoSSR>
        </React.Fragment>
      </Flexcolumn>
    </Flexrow>  
    <Flexrow>
      <Flexcolumn size={3}>
        <h1>3</h1>
      </Flexcolumn>
      <Flexcolumn size={9}>
        <h1>9</h1>
      </Flexcolumn>
    </Flexrow>  
  </App>

const ConnectionLayout = withConnectionType(Layout)

const Index = (props) => {
  const { t } = props
  return (
    <React.Fragment>
      <Head>
        <title>{t ? t('title.home') : 'Home' }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ConnectionLayout {...props} />
    </React.Fragment>
  )
}
  
Index.getInitialProps = async ({apolloClient}) => {
  //const isServer = !!req
  //reduxStore.dispatch(serverRenderClock(isServer))
  const tuans = await apolloClient.query({query})

  return {tuans: tuans.data.tuans}
}

export default compose(
  connect(),
  withI18next(['common']),
)(Index)


