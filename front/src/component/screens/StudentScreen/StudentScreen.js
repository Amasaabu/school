import React, { useState } from 'react'
import classes from './StudentScreen.module.css'
import Sidebar from '../../ui/Sidebar/sidebar'
import { Switch, Route } from 'react-router-dom'
import Result from '../../Results/ResultSearch'
import Profile from '../../Profile/StudentProfile/profile'
const AdminProfile = () => {
    const [sideItems] = useState(
        [
            { item: 'View Result', url: `/studentScreen/getResult` },
            {item: 'ID_Card', url: `/studentScreen/profile`}
        ])

    return (
        <div className={classes.container}>
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