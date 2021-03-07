import express from 'express'
import Subject from '../models/Subject.js'
import Users from '../models/User.js'
import { auth, checkAdmin, checkLectAdmin } from '../middleware/auth.js'

const router = new express.Router()

//publish new subject by admin
router.post('/subject', auth,checkAdmin, async (req, res, next) => {
    try {
        // const preSubject = {
        //     ...req.body,
        //     lecturer: req.user._id
        // }
        const validSubject = new Subject(req.body)
        await validSubject.save()
        res.status(201).json(validSubject)
    } catch (error) {
        next(error)
    }
})

//get list of subject and their lecturers
router.get('/subject/lecturers', auth,checkAdmin, async (req, res, next) => {
    try {
        const subject_lecturers = await Users.find({ profileType: 'lecturer' })

        const valid = subject_lecturers.map((it) => {
            return it.populate({ path: 'subjects' }).execPopulate()
        })

        let d = []
        for (let index = 0; index < subject_lecturers.length; index++) {
            const element = await valid[index]

            let subjectAndUserIdArray = []
            if (element.subjects.length == 0) {
                subjectAndUserIdArray = [[null, element._id]]
            } else {
                subjectAndUserIdArray = element.subjects.map((it) => {
                    return [
                        it.subjectName,
                        element._id
                    ]
                })
            }
            d.push({
                [element.username]: subjectAndUserIdArray
            })

        }
        res.send(d)

        //  Promise.all(valid).then((item)=>{
        //     const data = item.map((it)=>{
        //         res.send({
        //             [it.username]: it.subjects
        //         })
        //     })
        //     res.send(data)
        // }).catch(e=>console.log(e))


    } catch (error) {
        next(error)
    }
})

//list of all subjects
router.get('/subject', auth,checkAdmin, async(req,res,next)=>{
    try {
        const subjects = await Subject.find({})
        res.status(200)
        res.send(subjects)
    } catch (error) {
        next(error)
    }
})

//getting lecturers subject
router.get('/lecturersub', auth, checkLectAdmin, async(req,res,next)=>{
    try {
        const subjects = await Subject.find({lecturer: req.user._id})
        res.send(subjects)

        
        // const lect =  await Users.findOne({_id: req.user._id})
        // await lect.populate('subjects').execPopulate()
        // res.send(lect.subjects)
    } catch (error) {
        next(error)
    }
})

export default router