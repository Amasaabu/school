import * as actionTypes from '../actions/actionTypes'

const initialState = {loading: false, lectData: [], searchResult: {}}

export const LecturerReducer =(state=initialState, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_LECTURERS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AFTER_LECTURERS:
            return {
                ...state,
                loading: false,
                lectData: [...actions.payLoad]
            }
       
        case actionTypes.BEFORE_NEW_SUBJECT:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AFTER_NEW_SUBJECT:
            return {
                ...state,
                loading: false,
                payLoad: actions.payLoad
            }
        case actionTypes.SUBJECT_ERROR:
            return {
                ...state,
                loading: false
            }
        
        default:
            return state
    }
}


export const StudentListReducer = (state={loading:false, students: []}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_STUDENT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AFTER_GET_STUDENT: 
            return {
                ...state,
                loading: false,
            
                students: [...actions.payLoad]
            }
        case actionTypes.GET_STUDENT_ERROR: 
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}


export const subjectListReducer=(state={loading: false, subjects: []}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_SUBJECT:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AFTER_GET_SUBJECT:
            // console.log(actions.payLoad);
            return {
                ...state,
                loading: false,
                subjects: [...actions.payLoad]
            }
        default:
            return state
    }
}

export const getAcademicSessionReducer = (state={sessions: [], loading: false}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_ACADEMIC_SESSION:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_ACADEMIC_SESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                sessions : actions.payLoad
            }
        case actionTypes.GET_ACADEMIC_SESSION_ERROR:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
