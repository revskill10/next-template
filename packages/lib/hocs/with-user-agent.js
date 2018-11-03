import React from 'react'

export const withUserAgent = Comp =>
  class extends React.Component {
    /*
     * Need to use args.ctx
     * See https://github.com/zeit/next.js#custom-document
     */
    static async getInitialProps(args) {
      return {
        ua: args.ctx.req
          ? args.ctx.req.headers['user-agent']
          : navigator.userAgent,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      }
    }

    render() {
      const {ua, ...props} = this.props
      return (        
          <Comp {...props} ua={ua} />        
      )
    }
}

export default withUserAgent