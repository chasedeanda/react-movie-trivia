import { combineReducers } from 'redux';
import moviesReducer from './movies.js';
import genreReducer from './genres.js';
import playersReducer from './players.js';
import gameReducer from './game.js';
import questionReducer from './questions.js';

const reducers = combineReducers({
  movies: moviesReducer,
  genres: genreReducer,
  players: playersReducer,
  currentGame: gameReducer,
  questions: questionReducer
});

const rootReducer = (state,action)=>{
  if(action.type === "GET_MOVIE_STARTED"){
    state = undefined
  }
  return reducers(state,action)
}

export default rootReducer;