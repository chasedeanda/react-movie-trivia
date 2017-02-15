import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
require('../styles/styles')

import Layout from './components/layout'
import SearchResults from './components/search-results'
import MostPopular from './components/most-popular'
import MovieDetails from './components/movie-details'

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={MostPopular}></IndexRoute>
        <Route path="/search/:query" component={SearchResults}/>
        <Route path="/details/:id" component={MovieDetails}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);