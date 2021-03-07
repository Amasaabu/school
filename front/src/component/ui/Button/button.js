import React from 'react'
import classes from './button.module.css'


const button = (props) => {
    // let color = []
    // if (true) {
    //     color.push(classes.green)
    // }
    return (
        <div>
            <button onClick={props.clicked} className={[classes.btn, classes[props.btnType]].join(' ')}>{props.children}</button>
        </div>
    )
}

export default button
