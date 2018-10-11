import React from 'react'
import App from '../components/App'
import Header from '../components/Header'
import LiveComponent from '../components/LiveComponent'
import { allPostsQuery, allPostsSubscription } from '../graphql/khoas.gql'
import { queryTuans as query } from '../graphql/tuans.gql'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../data/store'
import Examples from '../components/Examples'
import { Flexrow, Flexcolumn } from '../components/Grid'

const KhoasList = ({khoas}) =>
  <ul>
    {khoas.map(item => {
      return (
        <li key={item.id}>{item.ten_khoa}</li>
      )
    })}
  </ul>

const TuansList = ({tuans}) =>
  <ul>
    {tuans.map(item => {
      return (
        <li key={item.id}>{item.tu_ngay} - {item.den_ngay}</li>
      )
    })}
  </ul>

const Test = ({tuans}) =>
  <App>
    <div>
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
        <Flexcolumn size={3}>
          <h1>6</h1>
        </Flexcolumn>
        <Flexcolumn size={3}>
          <h1>3</h1>
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
    </div>
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
    return <Test {...this.props} />
  }
}  

export default connect()(Index)

