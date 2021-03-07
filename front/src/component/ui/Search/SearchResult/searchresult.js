import React from 'react'
import classes from './search.module.css'

const Searchresult = (props) => {
    return (
        <div onClick={props.clicked} className={classes.card}>
            <div className={classes.colorDesign}></div>
            <div className={classes.header}>{props.username}</div>
            <div className={classes.body}>
                <div className={classes.username}><span>Username: </span><span>{props.username}</span></div>
                <div className={classes.profileType}><span>Profiletype: </span><span>{props.profileType}</span></div>
                <div className={classes.sex}><span>Sex: </span><span>{props.sex}</span></div>
            </div>
        </div>
    )
}

export default Searchresult
