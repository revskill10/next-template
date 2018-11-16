import React from 'react'
import ErrorPage from 'next/error'

export default Component => {
  return class WithError extends React.Component {
    static async getInitialProps(ctx) {
      try {
        const props =
        (Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : null) || {}

        if (props.statusCode && ctx.res) {
          ctx.res.statusCode = props.statusCode
        }

        return props
      } catch (error) {
        if (ctx.res) {
          ctx.res.statusCode = 500
        }
        return {
          statusCode: 500
        }
      }
    }

    render() {
      if (this.props.statusCode) {
        return <ErrorPage statusCode={this.props.statusCode} />
      }

      return <Component {...this.props} />
    }
  }
}