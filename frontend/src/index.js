import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, combineReducers } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import readableReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  // reducer,
  readableReducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
)


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
