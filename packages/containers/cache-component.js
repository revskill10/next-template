//@flow
import React from 'react';
import {Subscription} from 'react-apollo';

const Error = ({error}) => <div>{error}</div>

function CacheComponent({cache, subscription, children, onSubscriptionData, context, toCache}) {
  const Provider = context.Provider
  if (process.browser) {
    return (
      <Subscription subscription={subscription} ssr={false} fetchPolicy={'cache-first'} onSubscriptionData={onSubscriptionData}>
        {({ loading, error, data }) => {
          if (loading) { return <Provider value={cache}>{children}</Provider> }
          if (error) return <Error {...error} />
          if (data) { 
            return <Provider value={toCache(data)}>{children}</Provider> 
          }
        }}
      </Subscription>
    )
  } else { return <Provider value={cache}>{children}</Provider> }
}

export default CacheComponent;
