import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
require('../styles/styles')

import Layout from './components/layout'
import StartPage from './components/start-page'
import Categories from './components/categories'
import GameBoard from './components/game-board'

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={StartPage}></IndexRoute>
        <Route path="/categories" component={Categories} />
        <Route path="/categories/:category_id" component={GameBoard} />
        {/*<Route path="/search/:query" component={SearchResults}/>
        <Route path="/details/:id" component={MovieDetails}/>*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);