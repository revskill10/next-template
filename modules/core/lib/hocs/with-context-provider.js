const withContextProvider = context => Component => props => {
  const Provider = context.Provider
  return (
    <Provider value={props}>
      <Component />
    </Provider>
  )
}

export default withContextProvider
