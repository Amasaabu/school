import* as actionTypes from './actionTypes'
import axios from 'axios'

export const NewSession =(session)=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        try {
            dispatch({type: actionTypes.BEFORE_POST_ACADEMIC_SESSION})
            const {data} =await  axios.post('/session', session, {
                headers: {
                    Authorization: token
                }
            })
            dispatch({type: actionTypes.POST_ACADEMIC_SESSION_SUCCESS, payLoad: data})
        } catch (error) {
            console.log(error);
            dispatch({type:actionTypes.POST_ACADEMIC_SESSION_ERROR})
        }
    }
}