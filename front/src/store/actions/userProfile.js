import * as actionTypes from './actionTypes'
import axios from 'axios'

const BEFORE_SIGNUP = ()=>{
    return{
        type: actionTypes.BEFORE_SIGNUP,
    }
}

const SIGNUP_COMPLETED=(data)=>{
    localStorage.setItem('userData', JSON.stringify(data))
    return {
        type: actionTypes.SIGNUP_COMPLETED,
        data: data.validUser
    }
}

export const AUTH_ERROR=(error)=>{
    // console.log(error.response.data.message);
    return{
        type: actionTypes.AUTHENTICATION_ERROR,
        // error: error.response.data.message
    }
}

export const SIGN_OUT = ()=>{
    localStorage.removeItem('userData')
    return{
        type: actionTypes.SIGN_OUT
    }
}

export const signUp=(data, showLogin)=>{
    return dispatch=>{
        let url = 'user/signup'
        if (showLogin){
            url = 'user/login'
        }
        dispatch(BEFORE_SIGNUP())
        axios.post(url, data).then(res=>dispatch(SIGNUP_COMPLETED(res.data)))
        .catch(e=>dispatch(AUTH_ERROR(e)))
    }
}