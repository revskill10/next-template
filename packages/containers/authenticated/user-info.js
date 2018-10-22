import { withCurrentUser } from 'lib/with-current-user'

function ComponentThatIsDeepInTheTree({ currentUser }) {
  return (
    <h1> Hello {currentUser.name} , Your roles: {currentUser.roles.join(', ')} </h1>
  );
}
    
export default withCurrentUser(ComponentThatIsDeepInTheTree);