const withInitialProps = callback => Component => {

  Component.getInitialProps = async (ctx) => {
    const data = await callback(ctx)
    return data
  }

  return Component;
}

export default withInitialProps
