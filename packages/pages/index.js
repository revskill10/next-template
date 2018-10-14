import {QueryAllLessonClass as query} from 'pages/index.gql'

export default async ({apolloClient}) => {
  const { data } = await apolloClient.query({query})

  return { data }
}
