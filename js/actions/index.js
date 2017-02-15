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