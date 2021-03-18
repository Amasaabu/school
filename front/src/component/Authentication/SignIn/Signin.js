import React, { useState } from 'react'
import Input from '../../ui/input/input'
import Button from '../../ui/Button/button'
import {NavLink} from 'react-router-dom'

const SignIn = (props) => {
    const [formData, setFormData] = useState({
        form: {
            email: {
                type: 'Email',
                value: '',
                placeHolder: 'PLEASE INPUT A VALID USERNAME',
                label: 'USERNAME'
            },
            password: {
                type: 'Password',
                value: '',
                placeHolder: 'PASSWORD',
                label: 'PASSWORD'
            }
        }
    })

    const formArray = []
    for (const key in formData.form) {
        formArray.push({
            key: key,
            element: formData.form[key]
        })
    }
    const form = formArray.map((it) => {

        return (
            <Input key={it.key}
                label={it.element.label}
                changed={(event) => {
                    const val = event.target.value
                    setFormData({
                        form: {
                            ...formData.form,
                            [it.key]: {
                                ...formData.form[it.key],
                                value: val
                            }
                        },

                    })
                }}
                el={it.element.label}
                placeHolder={it.element.placeHolder}
                value={it.element.value}
                Type={it.element.type} />
        )
    })
    return (
        <div>
            {form}
            <Button clicked={()=>props.clicked(formData.form.email.value, formData.form.password.value)} btnType={'alert'}>SIGN-IN</Button>
            <h2><NavLink to='/reset'>Forgot Password</NavLink></h2>
        </div>
    )
}

export default SignIn

