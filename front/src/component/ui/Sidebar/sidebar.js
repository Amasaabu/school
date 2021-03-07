import React from 'react'
import classes from './sidebar.module.css'
import {NavLink} from 'react-router-dom'

const sidebar = (props) => {
    const items = props.items.map((it)=>{
        return(
            <NavLink 
                key={it.url} to={it.url}><li className={classes.listItem}>{it.item}</li>
            </NavLink>
        )
    })

    return (
        <div className={classes.sidebar}>
            <div className={classes.profilePicture}></div>
            <div className={classes.sidebarContent}>
                <ul>
                {items}
                </ul>
            </div>
        </div>
    )
}

export default sidebar
