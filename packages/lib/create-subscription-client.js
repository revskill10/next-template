import {SubscriptionClient} from 'subscriptions-transport-ws';
import { updateSocketStatus } from 'data/actions'

export const createSubscriptionClient = ({
  wsUrl,
  store,
  getToken,
}) => {
  const wsClient = new SubscriptionClient(wsUrl, {
    reconnect: true,
    timeout: 30000,
    connectionParams: async () => {
      const token = getToken()
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        }
      }
    }
  });

  wsClient.maxConnectTimeGenerator.duration = () => wsClient.maxConnectTimeGenerator.max
  wsClient.onDisconnected(() => { 
    store.dispatch(updateSocketStatus('Disconnected'))
  });

  wsClient.onConnecting(() => { 
    store.dispatch(updateSocketStatus('Connecting'))
  });

  wsClient.onReconnecting(() => { 
    store.dispatch(updateSocketStatus('Reconnecting'))
  });

  wsClient.onConnected(() => { 
    store.dispatch(updateSocketStatus('Connected'))
  });

  return wsClient
}

export default createSubscriptionClient