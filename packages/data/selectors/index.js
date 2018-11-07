import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { openDialog, openSnackbar, closeDialog, closeSnackbar } from 'mui-redux-alerts';


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
function asyncOpenSnackbar(message, delay) {
  return (dispatch, getState) => {
    dispatch(openSnackbar({ message, autoHideDuration: delay }))
    dispatch(asyncCloseSnackbar(delay))
  }
}
function asyncCloseSnackbar(delay = 2000) {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(closeSnackbar())
    }, delay)
  }
}
const mapStateToAlerts = (state) => ({ alerts: state.alerts });
const mapDispatchToAlerts = (dispatch) => {
  return {
    openAlert: (message, delay) => dispatch(asyncOpenSnackbar(message, delay)),
    closeAlert: (delay) => dispatch(asyncCloseSnackbar(delay))
  }
}
/*
usage in with-service-worker and layout router
*/
export const withAlerts = connect(mapStateToAlerts, mapDispatchToAlerts)
