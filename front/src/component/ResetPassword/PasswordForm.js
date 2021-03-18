import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import classes from './resetPassword.module.css'
import axios from 'axios'

const PasswordForm = (props) => {
    const [password, setPassword] = useState({ value: '' })
    const [modal, setModal] = useState(false)

    const inputChangeHandler = (e) => {
        setPassword({
            ...password,
            value: e.target.value
        })
    }

    const submitHandler = async () => {
        const token = props.match.params.id
        try {
            await axios.post(`/user/reset/${token}`, { password: password.value })
            setModal('reset password success, you can now log in')
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
                        Information
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal}</Modal.Body>
            </Modal>

            <h5 style={{ fontSize: '30px' }}>Reset Password</h5>
            <Form>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password.value} onChange={inputChangeHandler} type='password' placeholder='Enter New Password' />
                </Form.Group>
                <Button onClick={submitHandler} variant="danger" size="lg" block>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default PasswordForm

