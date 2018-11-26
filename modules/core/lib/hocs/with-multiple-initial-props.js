export const withMultipleInitialProps = callbacks => Component => {

  Component.getInitialProps = async (ctx) => {
    const {req} = ctx
    let fetchPolicy = req ? { fetchPolicy: 'network-only' } : { fetchPolicy: 'cache-first' }
    const res = await Promise.all(
      callbacks.map(callback => callback({
      ...ctx,
      fetchPolicy,
      })))
    return res
  }

  return Component;
}

export default withMultipleInitialProps
