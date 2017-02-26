import axios from 'axios';
import * as CONSTANTS from '../constants.js';
const { API_BASE, API_KEY } = CONSTANTS;

export const searchMovies = (query) => {
    return dispatch => {
      dispatch({type: "SEARCH_MOVIES_START"})
      return axios.get(`${API_BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`)
        .then(response => response.data.results)
        .then(movies => dispatch({type:"SEARCH_MOVIES_COMPLETED",payload:movies}))
        .catch((error)=>{
          dispatch({
            type: "SEARCH_MOVIES_ERROR",
            payload: error
          })
        })
    }
}

export const getMostPopular = ()=>{
  return dispatch =>{
    dispatch({type: "MOST_POPULAR_START"});
    return axios.get(`${API_BASE}/movie/popular?api_key=${API_KEY}&language=en-US`)
      .then(response => response.data.results)
      .then(movies => dispatch({type:"MOST_POPULAR_COMPLETE",payload:movies}))
  }
}

export const getMovie = (id) =>{
  return dispatch => {
    dispatch({type:"GET_MOVIE_STARTED"})
    return axios.get(`${API_BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(response => response.data)
    .then(movie => dispatch({type:"GET_MOVIE_COMPLETED",payload:[movie]}))
  }
}

export const loadGenres = () => {
  return dispatch => {
    dispatch({type: "FETCH_GENRES_STARTED"})
    return axios.get(`${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => response.data.genres)
    .then(genres => dispatch({type: "FETCH_GENRES_COMPLETED",payload:genres}))
  }
}

export const changePlayerName = (player, name) => {
  return dispatch => {
    if(player==="1") dispatch({type: "CHANGE_PLAYER_1_NAME", payload: name})
    if(player==="2") dispatch({type: "CHANGE_PLAYER_2_NAME", payload: name})
  }
}

export const loadMoviesByGenre = (genre_id) => {
  return dispatch => {
    return axios.get(`${API_BASE}/genre/${genre_id}/movies?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=created_at.asc`)
    .then(response => response.data.results)
    .then(movies => dispatch({type: 'LOAD_MOVIES_BY_GENRE_COMPLETED', payload: movies}))
  }
}