import { combineReducers } from 'redux';
import moviesReducer from './movies.js';
import mostPopularReducer from './most-popular.js';

const reducers = combineReducers({
  movies: moviesReducer,
  mostPopular: mostPopularReducer
});

const rootReducer = (state,action)=>{
  if(action.type === "GET_MOVIE_STARTED"){
    state = undefined
  }
  return reducers(state,action)
}

export default rootReducer;