const UIContainer = (props) => {
  const {Component, pageProps, router} = props
  return (
    <Component key={router.route} {...pageProps} />              
  )
}

export default UIContainer
