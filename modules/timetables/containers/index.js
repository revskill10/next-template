import {createContext, useEffect} from 'react'
import {withNamespaces} from 'react-i18next'
import Grid from 'modules/timetables/containers/grid'
import {useApolloClient} from 'lib/hooks/apollo'
import {
  allResourcesQuery,
  allResourcesSubscription,
  allEventsQuery,
  allEventsSubscription,
  fullPageQuery as query,
} from 'modules/timetables/fragments/events.gql.js'
import Calendar from 'modules/timetables/components/calendar'
import ContextComponent from 'containers/context-component'
import { forEach } from 'async';
import moment from 'moment'
const namespaces=['timetables']

//const {VIEW_TIMETABLE} = require('modules/timetables/policies')
const allowedPermissions=[]
const titleKey = 'title'
const descriptionKey = titleKey
const context = createContext('timetables')

export const getInitialProps = async({req, apolloClient, fetchPolicy}) => {
  await apolloClient.query({query, ...fetchPolicy})
}

const process = data => {
  let events = data.events.map(item => {
    return {
      ...item,
      start: moment(item.start, moment.ISO_8601).toDate(),
      end: moment(item.end, moment.ISO_8601).toDate(),
    }
  })
  return {
    resourceMap: data.resourceMap,
    events,
  }
}

const useSubscriptions = (items) => {
  const client = useApolloClient()
  useEffect(() => {
    let subscriptions = []
    items.forEach(item => {
      const query = item.query
      const subscription = item.subscription
      const tmp = client.subscribe({
        query: subscription
      }).subscribe({
        next({data}) {
          client.cache.writeQuery({
            query,
            data: item.mapper(data),
          })
        }
      })
      subscriptions.push(tmp)
    })

    return () => {
      subscriptions.forEach(item => {
        item.unsubscribe()
      })
    }
  })
}
const items = [
  {
    query: allResourcesQuery,
    subscription: allResourcesSubscription,
    mapper: (data) => {
      return {
        resourceMap: data.sche_classrooms
      }
    }
  },
  {
    query: allEventsQuery,
    subscription: allEventsSubscription,
    mapper: (data) => {
      return {
        events: data.sche_v6_timetables
      }
    }
  }
]
const IndexPage = ({t}) => {
  useSubscriptions(items)
  return (
    <Grid>
      <ContextComponent
        query={query}
        context={context}
        process={process}
      >
        <Calendar context={context} />
      </ContextComponent>
    </Grid>
  )
}

export default IndexPage