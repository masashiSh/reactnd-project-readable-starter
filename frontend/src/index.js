import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider, combineReducers } from 'react-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import logger from 'redux-logger'

import { Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'


import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import readableReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  // reducer,
  combineReducers({
    readableReducer,
    router: routerReducer    
  }),
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
)

const history = createHistory()


ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
