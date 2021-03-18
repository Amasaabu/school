import React from 'react'
import {useSelector} from 'react-redux'
import classes from './profile.module.css'

const Profile = () => {
    const profileData = useSelector(state=>{
        return {
            profile: state.userProfile.profileData
        }
    })
    const {profile} = profileData
    console.log(`http://localhost:3000${profile.profileImage}`)
    return (
        <div className={classes.container}>
            <div className={classes.profilePicture}>
                <img class="fit-picture"
                src={`http://localhost:3000${profile.profileImage}`}
                alt="Profiless"/></div>
            <div className={classes.profileBody}>
                <div><span>Name: </span>{profile.username}</div>
                <div><span>Sex: </span>{profile.sex}</div>
                <div><span>class: </span>{profile.class}</div>
                <div><span>Email: </span>{profile.email}</div>
            </div>
        </div>
    )
}

export default Profile
