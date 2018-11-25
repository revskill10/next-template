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

const IndexPage = ({t}) => {
  const client = useApolloClient()
  useEffect(() => {
    const allResourcesSub = client.subscribe({
      query: allResourcesSubscription
    }).subscribe({
      next({data}) {
        client.cache.writeQuery({
          query: allResourcesQuery,
          data: { resourceMap: data.sche_classrooms }
        })
      }
    })

    const allEventsSub = client.subscribe({
      query: allEventsSubscription
    }).subscribe({
      next({data}) {
        client.cache.writeQuery({
          query: allEventsQuery,
          data: {events: data.sche_v6_timetables}
        })
      }
    })

    return () => {
      allResourcesSub.unsubscribe()
      allEventsSub.unsubscribe()
    }
  })
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