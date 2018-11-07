import { combineReducers } from "redux"
import websocket from 'data/reducers/websocket'
import { reducer as alerts } from 'mui-redux-alerts';

export default combineReducers({
  alerts,
  websocket,
});
