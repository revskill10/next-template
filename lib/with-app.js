import App from 'next/app'

const withApp = Container =>
  class extends App {
    render () {
      return <Container {...this.props} />
    }
  }

export default withApp