
const gql = require('graphql-tag')

export const eventFragment = gql`
fragment eventFragment on sche_v6_timetables {
  id:event_id
  title:event_name
  start:start_date_time
  end:end_date_time
  status_id
  resourceId:classroom_id
  resourceName:classroom_name
}
`

export const allEventsQuery = gql`
query {
  events:sche_v6_timetables {
    ...eventFragment
  }
}
${eventFragment}
`

export const allEventsSubscription = gql`
subscription {
  sche_v6_timetables {
    ...eventFragment
  }
}
${eventFragment}
`

export const resourceFragment = gql`
fragment resourceFragment on sche_classrooms {
  resourceId:id
  resourceTitle:classroom_name
}
`

export const allResourcesQuery = gql`
query {
  resourceMap:sche_classrooms {
    ...resourceFragment
  }
}
${resourceFragment}
`

export const allResourcesSubscription = gql`
subscription {
  sche_classrooms {
    ...resourceFragment
  }
}
${resourceFragment}
`

export const fullPageQuery= gql`
query {
  resourceMap:sche_classrooms {
    ...resourceFragment
  }
  events:sche_v6_timetables {
    ...eventFragment
  }  
}
${eventFragment}
${resourceFragment}
`
