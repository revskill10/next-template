import { connect } from 'react-redux'
import { createSelector } from 'reselect'

const websocketSelector = state => state.websocket.status;

const isConnectedSelector = createSelector(
  websocketSelector,
  status => status === 'Connected'
)

const mapStateToWebsocketStatus = (state) => {
  return {
    isConnected: isConnectedSelector(state),
    isDisconnected: !isConnectedSelector(state)
  }
}

export const withWebsocketStatus = connect(mapStateToWebsocketStatus)



