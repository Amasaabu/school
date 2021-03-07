import * as actionTypes from '../actions/actionTypes'

const initialState = { 
    loading: false,  searchResult: {} 
}

export const searchProfileUserReducer = (state=initialState , actions)=>{
    switch(actions.type) {
        case actionTypes.BEFORE_SEARCH:
            return {
                ...state,
                loading: true
            }

        case actionTypes.AFTER_SEARCH:
            return {
                ...state,
                loading: false,
                searchResult: {
                    ...actions.payLoad
                }
            }
        case actionTypes.SEARCH_ERROR:
            return {
                ...state,
                searchResult: {},
                loading: false
            }
        case actionTypes.SEARCH_RESET: 
            return {
                searchResult: {},
                loading: false
            }
        default:
            return state
        }
}


export const getListReducer =(state={loading: false, list: []}, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_GET_GROUP:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AFTER_GET_GROUP:
            return {
                ...state,
                loading: false,
                list: actions.payLoad
            }
        case actionTypes.GET_GROUP_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}