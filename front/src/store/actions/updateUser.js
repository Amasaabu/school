import * as actionTypes from './actionTypes'
import axios from 'axios'

export const updateUser=(id, updateData)=>{
    return async dispatch=>{
        try {
            dispatch({type: actionTypes.BEFORE_SUBMIT_UPDATE})

        const userData = localStorage.getItem('userData')
        const token = userData ? JSON.parse(userData).token : ''
        const { data } = await axios.put(`/user/edit/${id}`, updateData, {
            headers: {
                Authorization: token
            }
        })
        dispatch({type: actionTypes.AFTER_SUBMIT_UPDATE, payLoad: data})
        }
        catch(error) {
        dispatch({type: actionTypes.SUBMIT_UPDATE_ERROR})
    }

    } 
}

export const ResetEditForm=()=>{
    return dispatch=>{
        dispatch({type: actionTypes.SUBMIT_UPDATE_ERROR_RESET})
    }
}