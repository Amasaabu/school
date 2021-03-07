import axios from 'axios'
import * as actionTypes from './actionTypes'

export const getStudent = ()=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async (dispatch)=>{
        // dispatch({type:actionTypes.BEFORE_GET_STUDENT})
        try {
           const {data} = await axios.get('/user/user?profileType=student', {
               headers: {
                   Authorization: token
               }
           })
            dispatch({type: actionTypes.AFTER_GET_STUDENT, payLoad: data})
        } catch (error) {
            dispatch({type:actionTypes.GET_STUDENT_ERROR})
        }
        
    }
}

export const getSubject=()=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        try {
            const { data } = await axios.get('/subject/subject', {
                headers: {
                    Authorization: token
                }
            })
            dispatch({type: actionTypes.AFTER_GET_SUBJECT, payLoad: data})
        } catch (error) {
            dispatch({type: actionTypes.SUBJECT_ERROR})
        }
    }
}

export const getSubjectByLecturer = () => {
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch => {
        try {
            const { data } = await axios.get('/subject/lecturersub', {
                headers: {
                    Authorization: token
                }
            })
            dispatch({ type: actionTypes.AFTER_GET_SUBJECT, payLoad: data })
        } catch (error) {
            dispatch({ type: actionTypes.SUBJECT_ERROR })
        }
    }
}

export const getAcademicSession =()=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        try {
            const {data} = await axios.get('/session', {
                headers: {
                    Authorization: token
                }
            })
            dispatch({type: actionTypes.GET_ACADEMIC_SESSION_SUCCESS, payLoad: data})
        } catch (error) {
            dispatch({type: actionTypes.GET_ACADEMIC_SESSION_ERROR})
        }
    }
}


