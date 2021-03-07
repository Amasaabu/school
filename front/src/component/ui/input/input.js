import React from 'react'
import classes from './input.module.css'

 const Input = (props) => {
    let input = null
    switch(props.Type) {
        case('Input'):
         input=(
            <div>
            <label className={classes.label}>{props.label}</label>
                 <input onChange={props.changed} className={classes.inputField} type='text' name='input' placeholder={props.placeHolder} value={props.value}/>
            </div>
            )
            break
        case('Email'):
           input=( <div>
            <label  className={classes.label}>{props.label}</label>
               <input onChange={props.changed} className={classes.inputField} name='email' type='email' value={props.value}  placeholder={props.placeHolder} />
            </div>)
            break
        case('Password'):
           input =( <div>
                <label  className={classes.label}>{props.label}</label>
                <input onChange={props.changed} className={classes.inputField} name='password' value={props.value} type='password' placeholder={props.placeHolder} />
            </div>)
            break
        case('Select'):
            input=(
                <div>
                <label className={classes.label}>{props.label}</label>
                <select className={classes.select}  onChange={props.changed} name='sex'>
                    <option value={props.default}>{props.default}</option>
                    {props.options.map((option)=>{
                        return(
                        <option key={option} value={option}>{option}</option>
                    )})}
                </select>
                </div>
            )
        break
        default:
            input = (<div>
                <label className={classes.label}>{props.label}</label>
                <input onChange={props.changed} className={classes.inputField} type='text' name='input' placeholder={props.placeHolder} value={props.value} />
            </div>)
    }
    return (
        <div className={classes.form}>
            {input}
        </div>
    )
}

export default Input