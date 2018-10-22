import React from 'react'
import { graphql } from 'react-apollo';
import { compose, mapProps, branch, renderNothing } from 'recompose';
import gql from 'graphql-tag'
import { inspect } from 'util'

const query = gql`
  query {
    currentUser {
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

export const withCurrentUser = compose(
  graphql(query, defaultPolloOptions),
  mapProps(({ data, ...rest }) => {
    return {
      loading: data.loading,
      currentUser: data.currentUser,
      ...rest,
    };
  }),
  branch(({ loading }) => {
    return !!loading;
  }, renderNothing)
);



/*
function ComponentThatIsDeepInTheTree({ currentUser }) {
  if (currentUser.permissions.role !== 'OWNER') {
    return null; 
  }
  
  return (
    <h1> I am an owner! </h1>
  );
}
    
export default withCurrentUser(ComponentThatIsDeepInTheTree);
*/

export default (App) => {
  return class AppWithCurrentUser extends React.Component {
    static async getInitialProps (context) {
      const { ctx } = context

      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      
      const { data } = await ctx.apolloClient.query({query})
      ctx.currentUser = data.currentUser
      // Provide the store to getInitialProps of pages

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(context)
      }

      return {
        ...appProps,
        currentUser: data.currentUser,
      }
    }

    render () {
      return <App {...this.props} />
    }
  }
}