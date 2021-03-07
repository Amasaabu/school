import React, { useState} from 'react'
import classes from './Auth.module.css'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/Signin'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom'
import withErrorHandler from '../../hoc/withErrorHandler'

const Auth = () => {
    
    const [showLogin, setLogin] = useState(false)


    
    const dispatch = useDispatch()
    const profile = useSelector(state=>{
        return {
            profile: state.userProfile.profileData,
            error: state.userProfile.error,
            loading: state.userProfile.loading
        }
    })

    const submitHandler = (email, password, username, sex) => {
        const data = {
            email,
            password,
            username,
            sex
        }
        dispatch(actions.signUp(data, showLogin))
    }
     const switchLogin=()=>{
         setLogin(!showLogin)
     }


    let url = ''
    if (profile.profile.profileType==='admin') {
        url = '/adminProfile/registration'
    } else if (profile.profile.profileType==='student') {
         url = '/studentScreen'
    } else if (profile.profile.profileType==='lecturer') {
        url = 'lecturerScreen'
    }
    
 
    return (
        <>
        
        <div className={classes.form}>
                <Redirect to={url} /> 
                {profile.loading? <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>:null}
            {showLogin?<SignIn clicked={submitHandler}/>:<SignUp clicked={submitHandler}/>}
            <h5 
                onClick={switchLogin}>
                {showLogin?'I dont have an account':'Already Have An Account, Sign-In?'}</h5>
        </div>
        </>
    )
}

export default withErrorHandler(Auth) 
