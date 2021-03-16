import React, { useState } from 'react'
import classes from './AdminScreen.module.css'
import Sidebar from '../../ui/Sidebar/sidebar'
import {Switch, Route, Redirect} from 'react-router-dom'
import Registration from '../../ui/forms/Registration/registration'
import Lecturers from '../../Lecturers/lecturers'
import Newsubject from '../../NewSubject/Newsubject'
import searchProfile from '../../ui/Search/searchProfile'
import EditForm from '../../ui/forms/EditForm/editForm'
import Publishresult from '../../ui/forms/Publishresult/publishresult'
import Result from '../../Results/ResultSearch'
import AcademicSession from '../../ui/forms/Session/AcademicSession'
import {useSelector} from 'react-redux'

const AdminProfile = () => {
    const [sideItems] = useState(
        [
            { item: 'Register', url: `/adminprofile/registration`},
            {item: 'New Subject', url: `/adminprofile/NewSubject`},
            {item: 'Profile And Edit', url: `/adminprofile/GetProfile`},
            {item: 'Publish Result', url:`/adminprofile/result`},
            {item: 'View Result', url: `/adminprofile/getResult`},
            {item: 'Sessions', url: `/adminprofile/sessions`},
            { item: 'Lecturers', url: `/adminprofile/Lecturers` },
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
                <Sidebar items={sideItems}/>
            </div>
            <div className={classes.content}>
                <Switch>
                    <Route path='/adminprofile/registration' component={Registration}/>
                    <Route path='/adminprofile/Lecturers' component={Lecturers} />
                    <Route path='/adminprofile/NewSubject' component={Newsubject} />
                    <Route exact path='/adminprofile/getProfile' component={searchProfile} />
                    <Route exact path='/adminprofile/getprofile/edit/:username' component={EditForm} />
                    <Route exact path='/adminprofile/result' component={Publishresult}/>
                    <Route  path='/adminprofile/getResult' component={Result} />
                    <Route exact path='/adminprofile/sessions' component={AcademicSession}/>
                </Switch>
            </div>
        </div>
    )
}

export default AdminProfile