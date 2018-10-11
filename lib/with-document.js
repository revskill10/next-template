import Document from 'next/document'

export const withDocument = Container =>
  class extends Document {
    render () {
      return <Container {...this.props} />
    }
  }

export default withDocument
