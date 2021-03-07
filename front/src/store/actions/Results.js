import * as actionTypes from './actionTypes'
import axios from 'axios'

export const submitResultAdmin = (resultData)=>{
    return async dispatch=>{
        const userData = localStorage.getItem('userData')
        const token = userData ? JSON.parse(userData).token : ''
        try {
            dispatch({type: actionTypes.BEFORE_SUBMIT_RESULT_ADMIN})
            const { data } = await axios.post('/result', resultData, {
                headers: {
                    Authorization: token
                }
            })
        console.log(data);
        dispatch({type: actionTypes.SUBMIT_RESULT_ADMIN_SUCCESS, payLoad: data})
        } catch (error) {
            dispatch({type: actionTypes.SUBMIT_RESULT_ADMIN_ERROR})
        }
        
    }
}

export const submitResultReset = ()=>{
    return {
        type: actionTypes.SUBMIT_RESULT_ADMIN_RESET
    }
}


export const getResultAdmin=(student_id,session_id)=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        dispatch({type: actionTypes.BEFORE_GET_RESULT_ADMIN})
        try {
            const { data } = await axios.get(`/result?owner=${student_id}&session=${session_id}`, {
                headers: {
                    Authorization: token
                }
            })
            dispatch({type: actionTypes.GET_RESULT_ADMIN_SUCCESS, payLoad: data}) 
        } catch (error) {
            dispatch({type: actionTypes.GET_RESULT_ADMIN_ERROR})
        }
    }
}
export const getResultStudent=(session_id)=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        try {
            const  {data} = await axios.get(`/result/student/${session_id}/`, {
                headers: {
                    Authorization: token
                }
            })  

            dispatch({ type: actionTypes.GET_RESULT_ADMIN_SUCCESS, payLoad: data }) 
        } catch (error) {
            dispatch({ type: actionTypes.GET_RESULT_ADMIN_ERROR })
        }
    }
}


export const deleteResultAdmin=(student_id, result_id)=>{
    return async dispatch=>{
       try {
           dispatch({type: actionTypes.BEFORE_DELETE_RESULT_ADMIN})
        const userData = localStorage.getItem('userData')
        const token = userData ? JSON.parse(userData).token : ''
        const {data } = await axios.delete(`/result/${student_id}/${result_id}`, {
            headers: {
                Authorization: token
            }
        })
        console.log(data);
        console.log(result_id);
        dispatch({type: actionTypes.DELETE_RESULT_ADMIN_SUCCESS})
    } catch (error) {
        dispatch({type: actionTypes.DELETE_RESULT_ADMIN_ERROR})
    } 
    }
    
}

export const getResultByLecturer=()=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        try {
            const { data } = await axios.get('/result/lecturer/publishedresult', {
            headers: {
                Authorization: token
            }
        })
        dispatch({type: actionTypes.AFTER_GET_RESULT_BY_LECTURER, payLoad: data})
    } catch (error) {
        dispatch({type: actionTypes.GET_RESULT_BY_LECTURER_ERROR})
    }
    }
    
}