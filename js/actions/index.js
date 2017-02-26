import 'babel-polyfill';
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

export const loadMovieGenres = () => {
  return dispatch => {
    dispatch({type: "FETCH_GENRES_STARTED"})
    return axios.get(`${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => response.data.genres)
    .then(genres => dispatch({type: "FETCH_GENRES_COMPLETED",payload:genres}))
  }
}
export const loadTVGenres = () => {
  return dispatch => {
    dispatch({type: "FETCH_GENRES_STARTED"})
    return axios.get(`${API_BASE}/genre/tv/list?api_key=${API_KEY}&language=en-US`)
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

export const loadMoviesByGenre = (genre_id, pageNumber) => {
  return dispatch => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=us&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${genre_id}`)
    .then(response => response.data)
    .then(movies => {dispatch({type: 'LOAD_MOVIES_BY_GENRE_COMPLETED', payload: {...movies,category_id:genre_id}});return movies})
    .then(movies => {
      dispatch({type:"START_LOAD_MOVIE_DETAILS",payload:true})
      let promises = [];
      movies.results.map((m)=>{
        promises.push(dispatch(loadDetails(m,'movie')))
        promises.push(dispatch(loadCast(m,'movie')))
        return m;
      })
      return Promise.all(promises)
    })
    .then(() => dispatch({type:"COMPLETE_LOAD_MOVIE_DETAILS",payload:true}))
    .catch((err) => dispatch({type:"LOAD_MOVIE_DETAILS_ERROR",payload:err}))
  }
}
const loadDetails = (m,type) => {
    return dispatch => {
      return axios.get(`${API_BASE}/${type}/${m.id}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.data)
      .then(movie => dispatch({type:"UPDATE_MOVIE_DETAILS",payload:movie}))
      .catch((err)=>{
        dispatch({type:"LOAD_MOVIE_DETAILS_ERROR",payload:err})
      })
    }
}
const loadCast = (m,type) => {
    return dispatch => {
      return axios.get(`${API_BASE}/${type}/${m.id}/credits?api_key=${API_KEY}&language=en-US`)
        .then(response => response.data.cast.slice(0,4))
        .then(cast => dispatch({type:"UPDATE_MOVIE_CAST",payload:{id:m.id,cast:cast}}))
        .catch((err,body)=>{
          dispatch({type:"LOAD_MOVIE_DETAILS_ERROR",payload:err})
        })
    }
}
export const loadTVByGenre = (genre_id, pageNumber) => {
  return dispatch => {
    return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&region=us&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${genre_id}`)
    .then(response => response.data)
    .then(movies => {dispatch({type: 'LOAD_MOVIES_BY_GENRE_COMPLETED', payload: {...movies,category_id:genre_id}});return movies;})
    .then(movies => {
      dispatch({type:"START_LOAD_MOVIE_DETAILS",payload:true})
      let promises = [];
      movies.results.map((m)=>{
        promises.push(dispatch(loadDetails(m,'tv')))
        promises.push(dispatch(loadCast(m,'tv')))
        return m;
      })
      return Promise.all(promises)
    })
    .then(() => dispatch({type:"COMPLETE_LOAD_MOVIE_DETAILS",payload:true}))
    .catch((err) => dispatch({type:"LOAD_MOVIE_DETAILS_ERROR",payload:err}))
  }
}