import React from 'react'
import classes from './delete.module.css'

const Delete = (props) => {
    return (
        <>
            <button onClick={props.clicked} className={[classes.btn, classes[props.children]].join(' ')}>{props.children}</button>
        </>
    )
}

export default Delete
