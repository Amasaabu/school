import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Form, Button} from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import {  Route } from 'react-router-dom'
import ResultComponent from './ResultComponent'

const Results = (props) => {

    const [form, setForm] = useState({ value: '', placeHolder: 'Enter student Name' })
    const [sessionForm, setSessionForm] = useState({value: '', options:[]})
    const dispatch = useDispatch()

    const submitSearch = () => {
        if (profileType==='student') {
        props.history.push(`/studentScreen/getresult/individual/?session=${sessionForm.value}`)  
        } else if(profileType === 'admin') {
            dispatch(actions.search({ searchValue: form.value, searchBy: 'student' }))
        } 
    }

    const {searchResult, sessionsArray, profileType} = useSelector((state)=>{
        return {
            searchResult: state.searchItem.searchResult,
            sessionsArray: state.academicSessions.sessions,
            profileType: state.userProfile.profileData.profileType
        }
    })

    useEffect(() => {  
        if (sessionsArray.length === 0) {
        console.log('dispatched');
        dispatch(actions.getAcademicSession()) 
        }
    }, [sessionsArray, dispatch])

     useEffect(() => {
            const mod_Array = sessionsArray.map((it)=>{
            return{displayValue: it.year, value: it._id}
        })
        // setSessionForm({...sessionForm, options: [{displayValue: '--select--', vlaue: ''},...mod_Array]})
        setSessionForm((data)=>{
            return {
                ...data,
                options: [{ displayValue: '--select--', vlaue: '' }, ...mod_Array]
            }
        })
     }, [ sessionsArray])
   
    useEffect(() => {
        if (searchResult._id) {
        console.log('id');
        props.history.push(`/adminprofile/getresult/${searchResult._id}?session=${sessionForm.value}`)  
    }
        return () => {
            dispatch(actions.resetSearch())
        }
    }, [dispatch, searchResult._id, props.history, sessionForm.value])
    
    return (
        <>
            <Form>
                {profileType === 'admin' ? <Form.Group>
                    <Form.Label style={{ fontWeight: '800', color: '#535353' }}>StudentName:</Form.Label>
                    <Form.Control
                        placeholder={form.placeHolder}
                        onChange={(event) => {
                            const val = event.target.value
                            setForm({
                                ...form,
                                value: val
                            })
                        }}
                        value={form.value}
                        type='text' />
                </Form.Group>:null}              
                <Form.Group>
                    <Form.Label style={{ fontWeight: '800', color: '#535353' }}>Select Academic Session</Form.Label>
                    <Form.Control
                    onChange={(event)=>{
                        const val = event.target.value
                        setSessionForm({
                            ...sessionForm,
                            value: val
                        })
                    }}
                     as='select'>{sessionForm.options.map((it)=>{
                        return(
                            <option value={it.value} key={it.value}>{it.displayValue}</option>
                        )
                    })}</Form.Control>
                </Form.Group>
                
           </Form>
            <Button style={{ marginBottom: '20px' }} onClick={submitSearch} variant='danger'>Search</Button>
            {profileType === 'admin' ? <Route exact path='/adminProfile/getResult/:id' component={ResultComponent} /> : <Route exact path='/Studentscreen/getresult/individual' component={ResultComponent} />}
            </>
    )
}

export default Results
