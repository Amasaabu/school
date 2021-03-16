import React, { useState } from 'react'
import classes from './StudentScreen.module.css'
import Sidebar from '../../ui/Sidebar/sidebar'
import { Switch, Route } from 'react-router-dom'
import Result from '../../Results/ResultSearch'
import Profile from '../../Profile/StudentProfile/profile'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AdminProfile = () => {
    const [sideItems] = useState(
        [
            { item: 'View Result', url: `/studentScreen/getResult` },
            {item: 'ID_Card', url: `/studentScreen/profile`}
        ])
    const profile = useSelector(state => {
        return {
            profile: state.userProfile.profileData,
        }
    })
    let redirect = ''
    
    if (!profile.profile.profileType) {
         redirect = <Redirect to='/'/>
    }

    return (
        <div className={classes.container}>
            {redirect}
            <div className={classes.sidebar}>
                <Sidebar items={sideItems} />
            </div>
            <div className={classes.content}>
                <Switch>
                    <Route path='/studentScreen/getResult' component={Result} />
                    <Route path='/studentScreen/profile' component={Profile} />
                </Switch>
            </div>
        </div>
    )
}

export default AdminProfile