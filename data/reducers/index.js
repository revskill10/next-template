import { combineReducers } from "redux"
import drawer from 'data/reducers/drawer'
import websocket from 'data/reducers/websocket'

export default combineReducers({
  drawer,
  websocket,
});
