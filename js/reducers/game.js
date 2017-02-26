const initialState = {
    difficulty: 'easy'
}

const gameReducer = (state=initialState,action) =>{
    switch(action.type){
        case "START_NEW_GAME":{
            state = {
                difficulty: action.payload.difficulty,
                type: action.payload.type
            }
            break;
        }
    }
    return state
}

export default gameReducer;