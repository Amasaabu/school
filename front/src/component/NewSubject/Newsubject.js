import React, { useEffect,useState } from 'react'
import {Form, Button, Spinner, Toast} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler'


const Newsubject = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(actions.getLecturers())
       
    },[dispatch])

    const data = useSelector((state)=>{
        return{
            lecturers: state.lecturer.lectData,
            loading: state.lecturer.loading,
            subjectPayload: state.lecturer.payLoad
        }
    })

    useEffect(()=>{
        if (data.subjectPayload) {
            setShowAlert(true)
        }
    }, [data.subjectPayload])
    
    const [form, setForm] = useState({
        lecturer: {
            value: '',
            placeHolder: ''

        },
        subject: {
            value: '',
            placeHolder: 'NEW SUBJECT NAME'
        }
    })

    const [showAlert, setShowAlert] = useState(false)

    const submitHandler=()=>{
        const data = {
            subjectName: form.subject.value,
            lecturer: form.lecturer.value
        }
        dispatch(actions.new_subject(data))
    }
    const options = data.lecturers.map((it)=>{
        return(
            Object.keys(it).map((x) =>{
                <div key={x}></div>//cause of unique key
                const val = it[x].map((e)=>e[1])
                return (
                    <option key={x} value={val[0]}>{x}</option>
                )
            }
            )
        )
    })

    const spinner = data.loading ? <Spinner animation="grow" variant="success" /> : null
    const alert = showAlert ? (<Toast delay='3000' onClose={() => setShowAlert(false)} autohide>
        <Toast.Header><strong style={{marginRight: 'auto'}}>ALERT</strong></Toast.Header>
        <Toast.Body>{data.subjectPayload.subjectName} subject succesfully created!!!</Toast.Body>
    </Toast>):null
    return (
        <div>
            {alert}
            {spinner}
            <Form.Group>
                <Form.Label style={{ color: 'black', fontWeight: '600' }}>SELECT COURSE LECTURER:</Form.Label>
                <Form.Control onChange={(event)=>{
                    const val = event.target.value
                    setForm({
                        ...form,
                        lecturer: {
                            ...form.lecturer.value,
                            value: val
                        }
                    })
                }} style={{}} as='select'>
                    <option value=''>--Select---</option>
                    {options}
                </Form.Control>
                <br/>
                <Form.Label style={{color: 'black', fontWeight: '600'}}>Enter new Subject Below:</Form.Label>
                <Form.Control placeholder={form.subject.placeHolder} onChange={(event)=>{
                    const val = event.target.value
                    setForm({
                        ...form,
                        subject: {
                            ...form.subject,
                            value: val
                        }

                    })
                }} value={form.subject.value} type='text'/>
                <Button onClick={submitHandler} style={{ marginTop: '20px' }} varriant='success'>Submit</Button>
            </Form.Group>
        </div>
    )
}

export default withErrorHandler(Newsubject)
