import React from 'react'
import classes from './grade.module.css'

const grade = (props) => {
    let grade = ''
    let style = ''
    if(props.score<=100 && props.score>=70) {
        grade = 'A'
        style = 'green'
    } else if(props.score >=60 && props.score<=70){
        grade= 'B'
        style ='yellow'
    } else if(props.score>=50 && props.score<=60){
        grade= 'C'
        style ='black'
    }
    else if(props.score>=40 && props.scored<=50){
        grade = 'D'
        style = 'red'
    } else {
        grade = 'F'
        style = 'red'
    }
    return (
        <div className={[classes[style]].join(' ')}>
            {grade}
        </div>
    )
}

export default grade
