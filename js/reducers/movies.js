const initialState = {
  fetching: false,
  fetched: false,
  movies: []
}
const moviesReducer = (state=initialState,action) => {
  switch(action.type){
    case "SEARCH_MOVIES_COMPLETED":{
      state = {...state, fetching:false,fetched:true,movies: action.payload};
      break;
    }
    case "SEARCH_MOVIES_START":{
      state = {...state, fetching:true}
      break;
    }
    case "GET_MOVIE_COMPLETED":{
      state = {...state, movies:action.payload,fetching:false,fetched:true}
      break;
    }
  }
  return state;
}

export default moviesReducer;