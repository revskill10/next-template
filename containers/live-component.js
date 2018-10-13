//@flow
import React from 'react';
import {Query, Subscription} from 'react-apollo';

const Loading = () => <div>Loading</div>;
const Error = ({error}) => <div>{error}</div>

function QueryComponent({query, subscription, children}) {
  function DataGraphQL({loading, error, data, children, query}) {
    if (loading) {
      return (
        <Query query={query} ssr={true} fetchPolicy={'cache-first'}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error} />
            return children(data);
          }}
        </Query>
      )
    }
    if (error) return <Error {...error} />
    if (data) {
      return children(data);
    }  
  }
  if (process.browser) {
    return (
      <Subscription subscription={subscription} ssr={false} fetchPolicy={'cache-first'}>
        {({ loading, error, data }) => {
          return (
            <DataGraphQL loading={loading} error={error} data={data} query={query}>
              {data => children(data)}
            </DataGraphQL>
          )
        }}
      </Subscription>
    )
  } else {
    return (
      <Query query={query} ssr={true} fetchPolicy={'cache-first'}>
        {({ loading, error, data }) => {
          return (
            <DataGraphQL loading={loading} error={error} data={data} query={query}>
              {data => children(data)}
            </DataGraphQL>
          )
        }}
      </Query>
    )
  }
}

export default QueryComponent;