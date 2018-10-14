import {getUser as query} from 'data/graphql/getUser.gql'

export default async apolloClient => {
  try {
    const data = await apolloClient.query({query})
    return { loggedInUser: data }
  } catch (e) {
    return { loggedInUser: {} }
  }
}
