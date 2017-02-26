const initialState = []

const questionReducer = (state=initialState,action) =>{
    switch(action.type){
        case "CREATE_QUESTION": {
            state = state.concat(action.payload)
            break;
        }
        case "UPDATE_QUESTION": {
            state = state.map((q,i)=>{
             return (q.id===action.payload.id)?
                  {  ...q, 
                      answered: action.payload.answered,
                      correct:action.payload.correct}
                : q
            })
            break;
        }
        case "CLEAR_QUESTIONS": {
            state = [];
            break;
        }
    }
    return state
}

export default questionReducer;

// {
//     text:"",
//     type: "",
//     correct:false,
//     assigned_player: null
// }