import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { inspect } from 'util'

const query = gql`
  query UserInfo {
    user_info{
      name
      roles
    }
  }
`

const defaultPolloOptions = {
  options: ({ fetchPolicy = 'cache-only' }) => {
    return {
      fetchPolicy,
    };
  }
}

export const withCurrentUser = App => (props) => {
  return (  
    <Query query={query} fetchPolicy={'cache-only'} ssr={!process.browser}>
      {
        ({data}) => <App currentUser={data.user_info[0]} {...props} />
      }
    </Query>
  )
}


export default (App) => {
  return class AppWithCurrentUser extends React.Component {
    static async getInitialProps (context) {
      const { ctx } = context
      const { apolloClient } = ctx

      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
        const { data } = await apolloClient.query({query})        
        ctx.currentUser = data.user_info[0]
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