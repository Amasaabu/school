import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'

const Logout = (props) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(actions.SIGN_OUT())
        props.history.push('/')
    },[dispatch,props.history])

    return (
        <div>

        </div>
    )
}

export default Logout
