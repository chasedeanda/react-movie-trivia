const initialState = {
  fetching: false,
  fetched: false,
  movies: []
}
const mostPopularReducer = (state=initialState,action)=>{
  switch(action.type){
    case "MOST_POPULAR_START":{
      state = {...state, fetching:true};
      break;
    }
    case "MOST_POPULAR_COMPLETE":{
      state = {...state, movies:action.payload,fetching:false,fetched:true}
      break;
    }
  }
  return state;
}

export default mostPopularReducer;