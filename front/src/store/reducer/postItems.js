import* as actionTypes from '../actions/actionTypes'

export const newSessionReducer = (state={loading: false, success: false}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_POST_ACADEMIC_SESSION:
            return {
                ...state,
                loading: true
            }
        case actionTypes.POST_ACADEMIC_SESSION_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false
            }
        case actionTypes.POST_ACADEMIC_SESSION_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}