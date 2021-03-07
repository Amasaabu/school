import * as actionTypes from '../actions/actionTypes'

const userData = localStorage.getItem('userData')
const parsed_data = userData?JSON.parse(userData):''

const initialState={
  loading: false,
  profileData:{
    ...parsed_data.validUser
    // profileType: '',
    // username: '',
  },
  newUser: null
}

 const profileReducer = (state=initialState, actions)=>{
    switch(actions.type){
      case actionTypes.BEFORE_SIGNUP:
        return {
          ...state,
          loading: true
        }
      case actionTypes.SIGNUP_COMPLETED:
      return {
        ...state,
        profileData: {...actions.data},
        loading: false        
      }     
      case actionTypes.SIGN_OUT:
        return {
          ...state,
          profileData: {},
          loading: false
        }
      case actionTypes.AUTHENTICATION_ERROR:
        return {
          ...state,
          loading: false,
          error: actions.error
        }
      case actionTypes.BEFORE_SUPERADMIN:{
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.AFTER_SUPERADMIN:{
        return {
          ...state,
          loading: false,
          newUser: {...actions.data}
        }
      }
      case actionTypes.SUPERADMIN_ERROR:{
        return {
          ...state,
          loading: false,
          error: actions.error
        }
        
      }
      default:
        return state
    }
    
}

export default profileReducer