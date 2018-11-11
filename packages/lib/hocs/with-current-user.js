import React from 'react'
import {CURRENT_USER_QUERY} from 'lib/hocs/with-current-user.gql'
import {LOGOUT} from 'components/auth/google-login.gql'

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
        if (!ctx.req) {
          const { data } = await apolloClient.mutate({mutation: LOGOUT})
          if (data.logout) {
            localStorage.removeItem("token")
            window.location.reload()
          }
        }
      }

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(context)
      }
      return {
        ...appProps,
        currentUser: ctx.currentUser,
      }
    }

    render () {
      return (
        <App {...this.props} />
      )
    }
  }
}