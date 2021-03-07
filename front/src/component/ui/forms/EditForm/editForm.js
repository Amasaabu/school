import React, { useState, useEffect } from 'react'
import Input from '../../input/input'
import Button from '../../Button/button'
import * as actions from '../../../../store/actions/index'
import { useSelector, useDispatch } from 'react-redux'
import withErrorHandler from '../../../../hoc/withErrorHandler'
import { Toast } from 'react-bootstrap'


const EditForm = ({match, history}) => {

    const username = (match.params.username)
    const searchBy = (history.location.search.split('=')[1])
    const dispatch = useDispatch()
    const profileData = useSelector(state => {
        return {
            searchResult: state.searchItem.searchResult,
            updateSucces: state.updatedDetails.updateSuccess,
            updateDetails: state.updatedDetails.validUser,
        }
    })
    console.log('infinite loop');
    useEffect(() => {
        console.log('useEffect');
        if (!profileData.searchResult.username) {
          
            dispatch(actions.search({searchValue: username, searchBy: searchBy}))    
        } 
        UpdateformData((data) => {
                return {
                    ...data,
                    username: {
                        ...data['username'],
                        value: profileData.updateDetails ? profileData.updateDetails.username:profileData.searchResult.username
                    },
                    email: {
                        ...data['email'],
                        value: profileData.updateDetails? profileData.updateDetails.email:profileData.searchResult.email
                    },
                    class: {
                        ...data['class'],
                        value: profileData.updateDetails?profileData.updateDetails.class:profileData.searchResult.class
                    }
                }
            })
            
    }, [username, dispatch, searchBy, profileData.searchResult, profileData.updateSucces,profileData.updateDetails])
    
    useEffect(() => {      
        return () => {
            console.log('unmounted');
            dispatch(actions.resetSearch())
        }
    }, [dispatch])
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
        class: {
            value: '',
            label: 'Class',
            placeHolder: '',
            Type: 'Input'
        },
        profileType: {
            Type: 'Select',
            value: '',
            default: '--Select profile Type--',
            options: ['lecturer', 'admin', 'student'],
            label: 'ProfileType'
        },
        sex: {
            Type: 'Select',
            label: 'Sex',
            value: '',
            default: '--- select - sex-- -',
            options: ['Male', 'Female']
        }
    })



    let form = Object.keys(formData).map((it) => {
        return (
            <Input
                key={it}
                label={formData[it].label}
                Type={formData[it].Type}
                value={formData[it].value}
                options={formData[it].options}
                default={formData[it].default}
                changed={(event) => {
                    let val = event.target.value
                    UpdateformData({
                        ...formData,
                        [it]: {
                            ...formData[it],
                            value: val
                        }
                    })
                }} />
        )
    })


    const [showAlert, setShowAlert] = useState(false)
    useEffect(()=>{
        if (profileData.updateSucces) {
            history.push(`/adminprofile/getprofile/edit/${profileData.updateDetails.username}?searchBy=${searchBy}`)
            setShowAlert(true)
            return ()=>{
                dispatch(actions.ResetEditForm())
            }
    }
    },[profileData.updateDetails,profileData.updateSucces, dispatch, searchBy, history])

    
    
        const alert = showAlert?(<Toast delay='5000' onClose={() => setShowAlert(false)} autohide>
            <Toast.Header><strong style={{ marginRight: 'auto' }}>ALERT</strong></Toast.Header>
            <Toast.Body> Data was Updated sucessfully!</Toast.Body>
        </Toast>): null
   

    const submitHandler =()=>{
        const data = {
            username: formData.username.value,
            email: formData.email.value,
            profileType: formData.profileType.value,
            sex: formData.sex.value,
            password: formData.password.value,
            class: formData.class.value
        }

        dispatch(actions.updateUser(username, data))
    }

    return (
        <div>
            {alert}
            {profileData.loading ? 'Loading' : form}
            <div style={{ width: '80px' }}>
                <Button clicked={submitHandler} btnType='green'>Submit</Button>
            </div>

        </div>
    )
}

export default withErrorHandler(EditForm)
