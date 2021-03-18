import React, {useState} from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
import classes from './resetPassword.module.css'
import axios from 'axios'

const ResetPassword = () => {
    const [email, setEmail] = useState({value: ''})
    const [modal, setModal] = useState(false)

    const inputChangeHandler = (e)=>{
        setEmail({
            ...email,
            value: e.target.value
        }) 
    }

    const submitHandler =async ()=>{
        try {
            await axios.post('/user/reset', { email: email.value })
            setModal(true)
        } catch (error) {
            setModal('Cant Reset Password')
            console.log(error);
        }
    }
    return (
        <div className={classes.container}>
            <Modal
                size="sm"
                show={modal}
                onHide={() => setModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Check Your Email For Reset Procedure
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal}</Modal.Body>
            </Modal>

            <h5 style={{fontSize: '30px'}}>Reset Password</h5>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email.value} onChange={inputChangeHandler} type='email' placeholder='Email'/>
                </Form.Group>
                <Button onClick={submitHandler} variant="danger" size="lg" block>
                   Submit
                </Button>
            </Form>
        </div>
    )
}

export default ResetPassword

