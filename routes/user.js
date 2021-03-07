import express from 'express'
import Subject from '../models/Subject.js'
import Users from '../models/User.js'
import { auth, checkAdmin, checkLectAdmin } from '../middleware/auth.js'
import User from '../models/User.js'

const router = new express.Router()

//to create new user
router.post('/signup', async (req, res, next) => {
    const user = req.body
    try {
        const validUser = new Users(user)
        await validUser.save()
        const token = await validUser.generateAuthToken()
        res.status(201).json({ validUser, token })
    } catch (error) {
        res.status(401)
        console.log(error);
        next(error)
    }
})

//to login user and generate authToken
router.post('/login', async (req, res, next) => {
    const user = req.body
    try {
        const validUser = await Users.findByCredentials(user.email, user.password)
        const token = await validUser.generateAuthToken()
        validUser.password = ''
        res.status(200).send({ validUser, token })
    } catch (error) {
        res.status(404)
        console.log(error);
        next(error)
    }
})

//to get user Profile with auth
router.get('/profile', auth, (req, res, next) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(401)
        console.log(error);
        next(error)
    }
})

//creating new lecturer and student by admin
router.post('/superUser', auth, async (req, res, next) => {
    try {
        if (req.user.profileType !== 'admin') {
            res.status(401)
            throw new Error('You are not authorized to make this request')
        }
        const preUser = new Users(req.body)
        const validUser = await preUser.save()
        res.status(201).json(validUser)
    } catch (error) {

        next(error)
    }

})

// to find a particular user
router.get('/finduser/:username',auth,async (req,res,next)=>{
    try {
        if (req.user.profileType !== 'admin') {
            res.status(401)
            throw new Error('You are not authorized to make this request')
        }
        const validUser = await Users.findOne({ username: req.params.username, profileType: req.query.profileType})
        if(!validUser) {
            throw new Error('User not found')
        }
        res.status(200).json(validUser)
    } catch (error) {
        next(error)
    }
})


//to edit a user
router.put('/edit/:username', auth, async(req,res,next)=>{
    try {
        if (req.user.profileType !== 'admin') {
            res.status(401)
            throw new Error('You are not authorized to make this request')
        }
        const user = await Users.findOne({username: req.params.username})
        if (!user){
            res.status(404)
            throw new Error('User not found')
        }
        user.username = req.body.username || user.username
        user.sex = req.body.sex || user.sex
        user.email = req.body.email || user.email
        user.class = req.body.class || user.class
        user.profileType = req.body.profileType|| user.profileType
        if (req.body.password) {
            user.password = req.body.password
        }

       const modified_user =  await user.save()

       if (!modified_user) {
           res.status(400)
           res.send('unable to modify user')
       }
        const { username, profileType, sex, email } = modified_user
        res.send({
            validUser: {
                username,
                profileType,
                sex,
                email
            }
        })
    } catch (error) {
        next(error)
    }
})


//to get list of all users in a group
router.get('/user', auth, checkLectAdmin, async(req,res, next)=>{
    try {
        const users = await Users.find({profileType: req.query.profileType})
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
})


// const test =async()=>{
//     // const de = await Users.findOne({ profileType: 'lecturer' })
//     // const d = await de.populate('subjects').execPopulate()
//     // console.log(d.subjects);

//     // const de =  Users.find({profileType: 'lecturer'})  //no await was used
//     // const d = await de.populate('subjects').exec() the execute here only works to get populated data out, incase u dont want async await
//     // console.log(de[0].subjects);
// }

// test()


// const test2=async()=>{
//     // const de = await Subject.findOne({})
//     // const d = await de.populate('lecturer').execPopulate()
//     // console.log(d.lecturer);

//     const de = Subject.find({})
//     const d = await de.populate('lecturer').exec()
//     console.log(d[1].lecturer);


// }
// test2()


export default router