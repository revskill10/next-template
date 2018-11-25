export const withInitialProps = callback => Component => {

  Component.getInitialProps = async (ctx) => {
    const {req} = ctx
    let fetchPolicy = req ? { fetchPolicy: 'network-only' } : { fetchPolicy: 'cache-first' }
    const res = await callback({
      ...ctx,
      fetchPolicy,
    })
    return res
  }

  return Component;
}

export default withInitialProps
