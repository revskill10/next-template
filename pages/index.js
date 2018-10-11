import React from 'react'
import App from '../components/App'
import Header from '../components/Header'
import LiveComponent from '../components/LiveComponent'
import { allPostsQuery, allPostsSubscription } from '../graphql/khoas.gql'
import { queryTuans as query } from '../graphql/tuans.gql'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../data/store'
import Examples from '../components/Examples'

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

const Test = () =>
  <App>
    <Header />
    <LiveComponent query={allPostsQuery} subscription={allPostsSubscription}>
      {KhoasList}
    </LiveComponent>
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
    const { tuans } = this.props 

    return (
      <React.Fragment>        
        <Test />
        <TuansList tuans={tuans} />
        <Examples />
      </React.Fragment>      
    )
  }
}  

export default connect()(Index)

