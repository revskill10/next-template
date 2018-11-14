import React from 'react'
import initApollo from 'lib/utils/init-apollo'
import { getToken } from 'lib/utils/get-token'
import { getDataFromTree } from 'react-apollo'

export default (App) =>
  class extends React.Component {
    static displayName = 'withApollo(App)'
    static async getInitialProps (ctx) {
      const { router, Component } = ctx
      const { reduxStore, req } = ctx.ctx

      const apollo = initApollo({}, {
        getToken: () => getToken(req),
        store: reduxStore
      })

      ctx.ctx.apolloClient = apollo

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => getToken(),
        store: props.reduxStore,
      })
      
    }

    render () {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
