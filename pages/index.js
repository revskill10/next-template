import App from '../components/App'
import Header from '../components/Header'
import LiveComponent from '../components/LiveComponent'
import { allPostsQuery, allPostsSubscription } from '../graphql/khoas.gql'

const KhoasList = ({khoas}) =>
  <ul>
    {khoas.map(item => {
      return (
        <li key={item.id}>{item.ten_khoa}</li>
      )
    })}
  </ul>

export default () => (
  <App>
    <Header />
    <LiveComponent query={allPostsQuery} subscription={allPostsSubscription}>
      {KhoasList}
    </LiveComponent>
  </App>
)
