import * as actionTypes from '../actions/actionTypes'

export const submitResultReducer = (state={submited: false,loading: false}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_SUBMIT_RESULT_ADMIN:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SUBMIT_RESULT_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                submited: true
            }
        case actionTypes.SUBMIT_RESULT_ADMIN_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SUBMIT_RESULT_ADMIN_RESET:
            return {
                ...state,
                submited: false
            }
        default:
            return state
    }
}


export const getResultReducer =(state={loading: false,deleteSuccess: false, studentReg: '',username: '', result: []}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_RESULT_ADMIN:
            return {
                ...state,
                loading: true,
                deleteSuccess: false
            }
        case actionTypes.GET_RESULT_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                studentReg: actions.payLoad.studentReg,
                username: actions.payLoad.username,
                class: actions.payLoad.Class,
                result:  actions.payLoad.scores,
                session: actions.payLoad.session,
                
            }
        case actionTypes.GET_RESULT_ADMIN_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_RESULT_ADMIN_SUCCESS:
            // const data = state.result.filter(it=>it._id !==actions.result_id)
            return {
                ...state,
                deleteSuccess: true
                // result: data,
                // loading: false
            }
        default:
            return state;
    }
}

export const getResultByLecturerReducer = (state = { loading: false, result:[]}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_RESULT_BY_LECTURER:
            return {
                ...state,
                loading: true
            } 
        case actionTypes.AFTER_GET_RESULT_BY_LECTURER:
            return{
                ...state,
                loading: false,
                result: actions.payLoad
            }
        case actionTypes.GET_RESULT_BY_LECTURER_ERROR: 
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}