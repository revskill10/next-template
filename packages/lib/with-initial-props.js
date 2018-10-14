const withInitialProps = callback => Component => {

  Component.getInitialProps = async (ctx) => {
    const res = await callback(ctx)
    return res
  }

  return Component;
}

export default withInitialProps
