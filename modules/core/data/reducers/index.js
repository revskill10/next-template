import { combineReducers } from "redux"
import websocket from 'data/reducers/websocket'
import swReducer from 'data/reducers/sw'
import { reducer as alerts } from 'mui-redux-alerts';

export default combineReducers({
  alerts,
  websocket,
  swReducer,
});
