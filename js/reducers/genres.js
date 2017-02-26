const initialState = {
    genres: []
}

const genreReducer = (state=initialState,action) =>{
    switch(action.type){
        case "FETCH_GENRES_COMPLETED":{
            let _data = action.payload.map((g)=>{
                return {...g, active: false}
            })
            state = {...state, genres: _data}
            break;
        }
    }
    return state
}

export default genreReducer;