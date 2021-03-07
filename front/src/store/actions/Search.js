import axios from 'axios'
import * as actionTypes from './actionTypes'

export const search = (input) =>{
    const userData = localStorage.getItem('userData')
    const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        dispatch({type: actionTypes.BEFORE_SEARCH})
        try{
          const {data} = await axios.get(`/user/finduser/${input.searchValue}?profileType=${input.searchBy}`, {
              headers: {
                  Authorization: token
              }
          })
           dispatch({
               type: actionTypes.AFTER_SEARCH,
               payLoad: data
           })
        } catch(e){
            dispatch({type:actionTypes.SEARCH_ERROR})
        }
       

    }
}

 export const getGroup = ({searchBy})=>{
     const userData = localStorage.getItem('userData')
     const token = userData ? JSON.parse(userData).token : ''
    return async dispatch=>{
        try {
            dispatch({type: actionTypes.BEFORE_GET_GROUP})
            const {data} = await axios.get(`/user/user?profileType=${searchBy}`, {
                headers: {
                    Authorization: token
                }
            })
            dispatch({type: actionTypes.AFTER_GET_GROUP, payLoad: data})
        } catch (error) {
            dispatch({type: actionTypes.GET_GROUP_ERROR})
        }
    }
}

export const resetSearch =()=>{
    return dispatch=>{
        dispatch({type: actionTypes.SEARCH_RESET})
    }
}