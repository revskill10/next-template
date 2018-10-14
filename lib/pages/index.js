import {QueryAllLessonClass as query} from 'data/graphql/v_all_lesson_class.gql'

export default async apolloClient => {
  const { data } = await apolloClient.query({query})

  return { data }
}
