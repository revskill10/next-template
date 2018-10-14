import { graphql } from 'react-apollo';
import { compose, mapProps, branch, renderNothing } from 'recompose';
import { currentUser as query } from 'data/graphql/current-user.gql'

const defaultPolloOptions = {
  options: ({ fetchPolicy = 'cache-only' }) => {
    return {
      fetchPolicy,
    };
  }
}

const withCurrentUser = compose(
  graphql(query, defaultPolloOptions),
  mapProps(({ data, ...rest }) => {
    return {
      loading: data.loading,
      currentUser: data.currentUser,
      ...rest,
    };
  }),
  branch(({ loading }) => {
    return !!loading;
  }, renderNothing)
);

export default withCurrentUser

/*
function ComponentThatIsDeepInTheTree({ currentUser }) {
  if (currentUser.permissions.role !== 'OWNER') {
    return null; 
  }
  
  return (
    <h1> I am an owner! </h1>
  );
}
    
export default withCurrentUser(ComponentThatIsDeepInTheTree);
*/