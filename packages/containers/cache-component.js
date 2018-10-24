//@flow
import React from 'react';
import {Subscription} from 'react-apollo';

const Error = ({error}) => <div>{error}</div>

function CacheComponent({cache, subscription, children, onSubscriptionData}) {
  if (process.browser) {
    return (
      <Subscription subscription={subscription} ssr={false} fetchPolicy={'cache-first'} onSubscriptionData={onSubscriptionData}>
        {({ loading, error, data }) => {
          if (loading) { return children(cache) }
          if (error) return <Error {...error} />
          if (data) { return children(data) }
        }}
      </Subscription>
    )
  } else { return children(cache) }
}

export default CacheComponent;