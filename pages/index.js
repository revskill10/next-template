import React from 'react'
import App from 'layouts/App'
import Header from 'components/Header'
import LiveComponent from 'containers/liveContainer'
import { allPostsQuery, allPostsSubscription } from 'graphql/khoas.gql'
import { queryTuans as query } from 'graphql/tuans.gql'
import { queryTotalTeacherInWeek, subscribeTotalTeacherInWeek } from 'graphql/v_get_total_teacher_in_week.gql'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from 'data/store'
import Examples from 'components/Examples'
import { Flexrow, Flexcolumn } from 'layouts/Grid'
import { withI18next } from 'lib/with-i18next'
import { compose } from 'recompose'
import Head from 'next/head'
import { KhoasList, TuansList, TotalTeacherInWeek } from 'components/graphql/reporting'

const Test = ({tuans}) =>
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
          <Examples />
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


class Index extends React.Component {
  static async getInitialProps ({ reduxStore, req, apolloClient }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))
    const tuans = await apolloClient.query({query})

    return {tuans: tuans.data.tuans}
  }

  componentDidMount () {
    const {dispatch} = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { t } = this.props
    return (
      <React.Fragment>
        <Head>
          <title>{t('title.home')}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Test {...this.props} />
      </React.Fragment>
    )
  }
}  

export default compose(
  connect(),
  withI18next(['common']),
)(Index)



