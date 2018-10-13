import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from 'data/reducers'

export function initializeStore () {
  let middlewares = [thunkMiddleware]
  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    const { composeWithDevTools } = require('redux-devtools-extension')
    middlewares.push(logger);
    return composeWithDevTools(
      applyMiddleware(...middlewares)
    )(createStore)(reducer);
  } else {
    return compose(
      applyMiddleware(...middlewares)
    )(createStore)(reducer);
  }
}