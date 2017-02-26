const initialState = {
    player1: {},
    player2: {}
}

const playersReducer = (state=initialState,action) =>{
    switch(action.type){
        case "CHANGE_PLAYER_1_NAME":{
            state = {...state, player1: {name: action.payload}}
            break;
        }
        case "CHANGE_PLAYER_2_NAME":{
            state = {...state, player2: {name: action.payload}}
            break;
        }
    }
    return state
}

export default playersReducer;