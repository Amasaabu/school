import React, { useEffect, useState } from 'react'
import Input from '../../input/input'
import Button from '../../Button/button'
import * as actions from '../../../../store/actions/index'
import {useSelector, useDispatch} from 'react-redux'
import withErrorHandler from '../../../../hoc/withErrorHandler'
import {Toast} from 'react-bootstrap'

const Registration = () => {
   
    const dispatch = useDispatch()
    const profileData = useSelector(state=>{
        return{
            profile: state.userProfile,
            error: state.userProfile.error,
            newUser: state.userProfile.newUser,
            searchResult: state.lecturer.searchResult
        }
    })



    const [formData, UpdateformData] = useState({
        username: {
            value: '',
            placeHolder: '',
            label: 'Username',
            Type: 'Input'
        },
        email: {
            value: '',
            label: 'Email',
            placeHolder: '',
            Type: 'Email'
        },
        password: {
            value: '',
            label: 'Password',
            placeHolder: '',
            Type: 'Password'
        },
        profileType: {
            Type: 'Select',
            value: '',
            default: '--Select profile Type--',
            options: ['lecturer', 'admin', 'student'],
            label: 'ProfileType'
        },
        class: {
            Type: 'Select',
            value: '',
            default: '--select--class',
            options: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'],
            label: 'Class'
        },
        sex: {
            Type: 'Select',
            label: 'Sex',
            value: '',
            default: '--- select - sex-- -',
            options: ['Male', 'Female']
        }
    })
    

    const submitHandler=()=>{
        const data = {
            username: formData.username.value,
            password: formData.password.value,
            sex: formData.sex.value,
            email: formData.email.value,
            profileType: formData.profileType.value,
            class: formData.class.value
        }
        dispatch(actions.createUser(data))
    }


    let form =Object.keys(formData).map((it)=>{
        return(
           <Input
           key={it}
           label={formData[it].label}
           Type={formData[it].Type}
           value={formData[it].value}
           options ={formData[it].options}
            default={formData[it].default}
            changed={(event)=>{
                let val = event.target.value
                UpdateformData({
                    ...formData,
                    [it]: {
                        ...formData[it],
                        value: val
                    }
                })
            }}/>
        )
    })

   
    const [showAlert, setShowAlert] = useState(false)

    useEffect(()=>{
        if (profileData.newUser) {
        setShowAlert(true)
    }
    }, [profileData.newUser])
    
   
    const alert = showAlert ? (<Toast delay='5000' onClose={() => setShowAlert(false)} autohide>
        <Toast.Header><strong style={{ marginRight: 'auto' }}>ALERT</strong></Toast.Header>
        <Toast.Body>{profileData.newUser.username} was sucessfully createrd!</Toast.Body>
    </Toast>) : null
    return (
        <div>
            {alert}
            {profileData.profile.loading?'Loading':form}
            <div style={{width: '80px'}}>
                <Button clicked={submitHandler} btnType='green'>Submit</Button>
            </div>
            
        </div>
    )
}

export default withErrorHandler(Registration)
