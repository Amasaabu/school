import React, { useState, useEffect} from 'react'
import classes from './Auth.module.css'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/Signin'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom'
import {Alert} from 'react-bootstrap'


const Auth = () => { 
    const [showLogin, setLogin] = useState(false)
    const dispatch = useDispatch()
    const profile = useSelector(state=>{
        return {
            profile: state.userProfile.profileData,
            error: state.userProfile.error,
            loading: state.userProfile.loading,
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

    useEffect(() => {
    if (!profile.profile.profileType) {
        dispatch(actions.checkAuthState())
    }
    }, [dispatch, profile.profile.profileType])

   
    const SignUpWithFb = () => {
        window.open("https://amasaschool.herokuapp.com/auth/facebook", "_self");
    }

    const [error, setError] = useState(profile.error)
    useEffect(() => {
        if (profile.error) {
        setError(profile.error)
    }
    }, [profile.error])
    
    const alertErr = (<div>
        <Alert variant='success' onClose={() => setError(false)} dismissible>
            <Alert.Heading>
                Oh! Snap Something went Wrong
            </Alert.Heading>
            <p>
                {error}
            </p>
        </Alert>
    </div>)
    return (
        <> 
            {error?alertErr:null}  
        <div className={classes.instructions}>
            <h3>Instructions</h3>
            <p>You can log in as an administrator by using 'test@test.com' as username and 'testtest' as password. Note: This is not a production build!</p>
        </div>        
        <div className={classes.form}>
                <Redirect to={url} /> 
                {profile.loading? <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>:null}
                {showLogin ? <SignIn SignUpWithFb={SignUpWithFb} clicked={submitHandler} /> : <SignUp SignUpWithFb={SignUpWithFb} clicked={submitHandler}/>}
            <h5 
                onClick={switchLogin}>
                {showLogin?'I dont have an account':'Already Have An Account, Sign-In?'}</h5>
        </div>
        </>
    )
}

export default (Auth) 
