const initialState = {
  fetching: false,
  fetched: false,
  movies: []
}
const moviesReducer = (state=initialState,action) => {
  switch(action.type){
    case "LOAD_MOVIES_BY_GENRE_COMPLETED":{
      state = {...state, fetching:false,fetched:true,movies: action.payload};
      break;
    }
    case "CLEAR_MOVIES":{
      state = {
        fetching: false,
        fetched: false,
        movies:[]
      }
    }
  }
  return state;
}

export default moviesReducer;