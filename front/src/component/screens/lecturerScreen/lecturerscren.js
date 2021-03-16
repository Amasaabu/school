import React, { useState } from 'react'
import classes from './lecturerScreen.module.css'
import Sidebar from '../../ui/Sidebar/sidebar'
import { Switch, Route, Redirect } from 'react-router-dom'
import LectPublish from '../../ui/forms/Publishresult/LectPublish/lectPublish'
import Profile from '../../Profile/StudentProfile/profile'
import ResultByLecturer from '../../Results/LecturerResult'
import {useSelector} from 'react-redux'

const LecturerProfile = () => {
    const [sideItems] = useState(
        [
            { item: 'Results', url: `/LecturerScreen/result` },
            { item: 'Publish Result', url: `/LecturerScreen/published` },
            { item: 'ID_Card', url: `/LecturerScreen/profile` }
        ])

    const profile = useSelector(state => {
        return {
            profile: state.userProfile.profileData,
        }
    })
    let redirect = ''

    if (!profile.profile.profileType) {
        redirect = <Redirect to='/' />
    }
    return (
        <div className={classes.container}>
            {redirect}
            <div className={classes.sidebar}>
                <Sidebar items={sideItems} />
            </div>
            <div className={classes.content}>
                <Switch>
                    <Route path='/LecturerScreen/result' component={ResultByLecturer}/>
                    <Route path= '/LecturerScreen/published' component={LectPublish} />
                    <Route path='/lecturerScreen/profile' component={Profile} />
                </Switch>
            </div>
        </div>
    )
}

export default LecturerProfile