import React from 'react'
import { Query } from 'react-apollo'
import { inspect } from 'util'
import {CURRENT_USER_QUERY} from 'lib/with-current-user.gql'


export const withCurrentUser = App => (props) =>
  <Query query={CURRENT_USER_QUERY} fetchPolicy={'cache-only'}>
    {
      ({data, loading}) => {
        if (data) {
          return <App currentUser={data.currentUser} {...props} />
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
        const { data } = await apolloClient.query({query: CURRENT_USER_QUERY})        
        ctx.currentUser = data.currentUser
        console.log(`AppWithCurrentUser ${inspect(ctx.currentUser)}`)
      
      // Provide the store to getInitialProps of pages

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