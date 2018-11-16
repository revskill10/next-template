const withProvider = Provider => Component => props => {
  return (
    <Provider value={props}>
      <Component />
    </Provider>
  )
}

export default withProvider