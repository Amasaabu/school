import * as actionTypes from '../actions/actionTypes'

const initialState = {loading: false, updateSuccess: false}

const updateReducer = (state=initialState, actions)=>{
    switch (actions.type) {
        case actionTypes.BEFORE_SUBMIT_UPDATE:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AFTER_SUBMIT_UPDATE:
            return {
                ...state,
                loading: true,
                updateSuccess: true,
                ...actions.payLoad
            }
        case actionTypes.SUBMIT_UPDATE_ERROR:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.SUBMIT_UPDATE_ERROR_RESET: {
            return {
                loading: false
            }
        }
        default:
            return state
    }
}

export default updateReducer