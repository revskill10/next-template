import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import produce from 'immer'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
}

const immerReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      draft.lastUpdate = action.ts
      draft.light = !!action.light
      break
    case actionTypes.INCREMENT:
      draft.count += 1
      break;
    case actionTypes.DECREMENT:
      draft.count -= 1
      break;
    case actionTypes.RESET:
      draft.count = exampleInitialState.count
      break;
  }
})

// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = dispatch => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() })
  }, 1000)
}

export const incrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.INCREMENT })
}

export const decrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.DECREMENT })
}

export const resetCount = () => dispatch => {
  return dispatch({ type: actionTypes.RESET })
}

export function initializeStore (initialState = exampleInitialState, reducer = immerReducer) {
  let middlewares = [thunkMiddleware]
  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    const { composeWithDevTools } = require('redux-devtools-extension')
    middlewares.push(logger);
    return composeWithDevTools(
      applyMiddleware(...middlewares)
    )(createStore)(reducer, initialState);
  } else {
    return compose(
      applyMiddleware(...middlewares)
    )(createStore)(reducer, initialState);
  }
}