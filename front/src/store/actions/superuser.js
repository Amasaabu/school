import * as actionTypes from './actionTypes'
import axios from 'axios'

const createdUser=(data)=>{
    return {
        type: actionTypes.AFTER_SUPERADMIN,
        data
    }
}
const createUserError=(data)=>{
    return {
        type: actionTypes.AUTHENTICATION_ERROR,
        // ...data.response.data.message
    }
}
const beforeCreate =(data)=>{
    return {
        type: actionTypes.BEFORE_SUPERADMIN
    }
}
export const createUser = (data)=>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return  dispatch=>{
        dispatch(beforeCreate())
       axios.post('/user/superUser',data,{
           headers: {
               Authorization: token 
           }
       }).then((res)=>{
           dispatch(createdUser(res.data))
       })
       .catch(e=>{
           dispatch(createUserError(e))
       })
    }
}


const initlect=()=>{
    return {
        type: actionTypes.BEFORE_GET_LECTURERS,
    }
}

const lect =(data)=>{
    return {
        type: actionTypes.AFTER_LECTURERS,
        payLoad: [...data]
        }
}

const lectError=()=>{
    return{
        type: actionTypes.GET_LECTURERS_ERROR
    }
}

export const getLecturers=()=>{
    return async dispatch=>{
        dispatch(initlect())
        const userData = localStorage.getItem('userData')
        const token = userData?JSON.parse(userData).token :''
        try{
            const {data} = await axios.get('/subject/subject/lecturers', {
                headers: {
                    Authorization: token
                }
            })
            dispatch(lect(data))
        } catch(e){
            dispatch(lectError())
        }
       
    }
}


//create new subject
export const new_subject =(data)=>{
    const userData = localStorage.getItem('userData')
    const token = JSON.parse(userData).token
    return dispatch=>{
        dispatch({type: actionTypes.BEFORE_NEW_SUBJECT})
        axios.post('/subject/subject', data, {
            headers: {
                Authorization: token
            }
        }).then(res=>dispatch({
            type: actionTypes.AFTER_NEW_SUBJECT,
            payLoad: res.data
        })).catch(e=>dispatch({type: actionTypes.SUBJECT_ERROR}))
    }
}