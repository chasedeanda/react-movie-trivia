const initialState = {
  page: 0,
  details_loaded: false,
  movies: []
}
const moviesReducer = (state=initialState,action) => {
  switch(action.type){
    case "LOAD_MOVIES_BY_GENRE_COMPLETED":{
      state = Object.assign({},state,action.payload,{movies:action.payload.results,cast:[]});
      break;
    }
    case "UPDATE_MOVIE_DETAILS":{
      state = {
        ...state,
        movies: state.movies.map((m,i)=>{
        return (m.id===action.payload.id)?
            Object.assign({},m,action.payload)
          : m
      })}
      break;
    }
    case "UPDATE_MOVIE_CAST":{
      state = {
        ...state,
        movies: state.movies.map((m,i)=>{
        return (m.id===action.payload.id)?
            {  ...m, 
                cast: action.payload.cast}
          : m
      })}
      break;
    }
    case "COMPLETE_LOAD_MOVIE_DETAILS":{
      state = {
        ...state,
        details_loaded: true,
        status:'complete'
      }
      break;
    }
    case "START_LOAD_MOVIE_DETAILS":{
      state = {
        ...state,
        details_loaded: false
      }
      break;
    }
    case "LOAD_MOVIE_DETAILS_ERROR":{
      state = {
        ...state,
        status: 'failed'
      }
      break;
    }
    case "CLEAR_MOVIES":{
      state = []
    }
  }
  return state;
}

export default moviesReducer;