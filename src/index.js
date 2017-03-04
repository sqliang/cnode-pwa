import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'seamless-immutable'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './containers/app'
import List from './containers/list'
import Detail from './containers/detail'
import NotFound from './containers/not-found'
import reducers from './reducers'
import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const presistedState = Immutable({
  drawer: {
    isVisible: false,
  },
  list: {
    isFetching: false,
    topics: [],
    activeTab: 'all',
  },
  detail: {
    isFetching: false,
    topic: null,
  },
})

const middlewares = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line
const store = createStore(
  reducers,
  presistedState,
  composeEnhancers(applyMiddleware(...middlewares)),
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={List} />
        <Route path="/topic/:id" component={Detail} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
)