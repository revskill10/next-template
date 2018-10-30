import React from 'react'
import { Query } from 'react-apollo'
import { inspect } from 'util'
import {CURRENT_USER_QUERY} from 'lib/with-current-user.gql'
import {LOGOUT} from 'components/auth/google-login.gql'
import {
  UserContext
} from 'containers/contexts'

export const withCurrentUser = App => (props) =>
  <Query query={CURRENT_USER_QUERY} fetchPolicy={'cache-only'}>
    {
      ({data, loading}) => {
        if (data) {
          return (
            <UserContext.Provider value={{currentUser: data.currentUser}}>
              <App {...props} />
            </UserContext.Provider>
          )
        }
        if (loading) {
          return <span>...</span>
        }
      }
    }
  </Query>

export default (App) => {
  return class AppWithCurrentUser extends React.Component {
    static async getInitialProps (context) {
      const { ctx } = context
      const { apolloClient } = ctx

      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      try {
        const { data } = await apolloClient.query({query: CURRENT_USER_QUERY})        
        ctx.currentUser = data.currentUser
      } catch (err) {
        const { data } = await apolloClient.mutate({mutation: LOGOUT})
        if (data.logout) {
          localStorage.removeItem("token")
          window.location.reload()
        }
      }
      // Provide the store to getInitialProps of pages
      console.log(`Ctx.currentUser: ${JSON.stringify(ctx.currentUser)}`)

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(context)
      }
      return {
        ...appProps,
      }
    }

    render () {
      return (
        <App {...this.props} />
      )
    }
  }
}