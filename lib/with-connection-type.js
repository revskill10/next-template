import React from 'react'

function withConnectionType(WrappedComponent, respondToChange = true) {
  if (process.browser) {
    return class extends React.Component {
      constructor(props) {
          super(props)
          this.state = {
              connectionType: undefined
          }
          // Basic API Support Check.
          this.hasNetworkInfoSupport = Boolean(
              navigator.connection && navigator.connection.effectiveType
          )
          this.setConnectionType = this.setConnectionType.bind(this)
      }

      componentWillMount() {
          // Check before the component first renders.
          this.setConnectionType()
      }

      componentDidMount() {
          // optional: respond to connectivity changes.
          if (respondToChange) {
              navigator.connection.addEventListener(
                  'change', 
                  this.setConnectionType
              )
          }
      }

      componentWillUnmount() {
          if (respondToChange) {
              navigator.connection.removeEventListener(
                  'change', 
                  this.setConnectionType
              )
          }
      }

      getConnectionType() {
          const connection = navigator.connection
          // check if we're offline first...
          if (!navigator.onLine) {
              return 'offline'
          }
          // ...or if reduced data is preferred.
          if (connection.saveData) {
              return 'saveData'
          }
          return connection.effectiveType
      }

      setConnectionType() {
          if (this.hasNetworkInfoSupport) {
              const connectionType = this.getConnectionType()
              this.setState({
                  connectionType
              })
          }
      }

      render() {
          // inject the prop into our component.
          // default to "undefined" if API is not supported.
          return (
              <WrappedComponent
                  connectionType={this.state.connectionType}
                  {...this.props}
              />
          )
      }
    }
  } else {
    return WrappedComponent
  }
}

export default withConnectionType