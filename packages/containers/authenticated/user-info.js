import useAuth from 'lib/hooks/auth'

function ComponentThatIsDeepInTheTree() {
  const {
    isAuthenticated,
    currentUser,
  } = useAuth()


  if (!isAuthenticated) {
    return (
      <h1> Hello {currentUser.name} , Your roles: {currentUser.roles.join(', ')} </h1>
    );
  } else {
    return <h1> Welcome {currentUser.name} , Your roles: {currentUser.roles.join(', ')}, Your Id: {currentUser.user_id} </h1>
  }
  
}
    
export default ComponentThatIsDeepInTheTree