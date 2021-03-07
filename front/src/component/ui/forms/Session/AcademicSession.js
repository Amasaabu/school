import React, {useState, useEffect} from 'react'
import Input from '../../input/input'
import {Button, Modal, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import* as actions from '../../../../store/actions/index'
import withErrorHandler from '../../../../hoc/withErrorHandler'

const AcademicSession = () => {
    const [session, setsession] = useState({value: ''})
    const form = (
        <Input value={session.value}
            changed={(event) => {
                const val = event.target.value
                setsession((data) => {
                    return {
                        ...data,
                        value: val
                    }
                })
            }} Type='Number'
            label='INPUT SESSION'></Input>
    )

    const dispatch = useDispatch()
    const {loading, success} = useSelector(state=>{
        return {
            loading: state.sessionState.loading,
            success: state.sessionState.success
        }
    })
    const submitHandler = ()=>{
        dispatch(actions.NewSession({year: session.value}))
    }
   
    const [showModal, setshowModal] = useState(false)
    const handleClose = ()=>{
        setshowModal(false)
    }
    useEffect(() => {
        if (success) {
            setshowModal(true)
        }
    }, [success])
    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>New Academic Session Submitted</Modal.Body>
            </Modal>
            {loading&&<Spinner animation="border" variant="warning" />}
            {form}
            <Button variant='danger' style={{marginTop: '20px'}} onClick={submitHandler}>Publish</Button>
        </div>
    )
}

export default withErrorHandler(AcademicSession)
