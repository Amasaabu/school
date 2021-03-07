import React, {useState} from 'react'
import Input from '../../ui/input/input'
import Button from '../../ui/Button/button'

const SignUp = (props) => {
    const [formData, setFormData] = useState({
        form: {
            username: {
                type: 'Input',
                value: '',
                placeHolder: '',
                label: 'USERNAME'
            },
            password: {
                type: 'Password',
                value: '',
                placeHolder: '',
                label: 'PASSWORD'
            },
            email: {
                type: 'Email',
                value: '',
                placeHolder: '',
                label: 'EMAIL'
            },
            select: {
                type: 'Select',
                label: 'Sex',
                default: '---select-sex---',
                options: ['Male', 'Female']
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
                options = {it.element.options}
                default = {it.element.default}
                value={it.element.value}
                Type={it.element.type} />
        )
    })
    return (
        <div>
            {form}
            <div style={{marginTop: '20px'}}>
            </div>
            <Button clicked={()=>props.clicked(formData.form.email.value, formData.form.password.value, formData.form.username.value, formData.form.select.value)}
             btnType={'green'}>SIGN-UP</Button>
        </div>
    )
}

export default SignUp
