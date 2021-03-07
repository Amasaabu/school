import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './header.module.css'
import {useSelector } from 'react-redux'

const Header = () => {

    const profile = useSelector(state => {
        return {
            profile: state.userProfile.profileData
        }
    })

    return (

        <div className={classes.header}>
            <div className={classes.logo}><NavLink to='/'><li>School</li></NavLink></div>
            <ul className={classes.navigation}>
                {profile.profile.username?<NavLink to='/logout'>Logout</NavLink>
                :<NavLink to='/'><li>HOME</li></NavLink>}
                {/* <NavLink to='/results'><li>RESULTS</li></NavLink>
                {profile.profile.username?<NavLink to='/profile'><li>PROFILE</li></NavLink>:null} */}
            </ul>
        </div>
    )
}



export default Header
