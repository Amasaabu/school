import express from 'express'
import Subject from '../models/Subject.js'
import Users from '../models/User.js'
import { auth, checkAdmin, checkLectAdmin } from '../middleware/auth.js'
import User from '../models/User.js'
import Result from '../models/Result.js'
import {check_duplicate_scores} from '../utils/utils.js'
import Session from '../models/Session.js'

const router = new express.Router()

//posting result by admin
router.post('',auth,checkLectAdmin, async (req,res,next)=>{
    try {
        const result = req.body
        const found_result = await Result.findOne({owner: result.owner, session: result.session})
        if (found_result) {     
            result.scores.forEach((it)=>{ 
                //check if subject is already in the database
                const evaluated_result =  found_result.scores.filter((elem)=>{
                        return (elem.subject.toString() === it.subject.toString())                    
                    })
                if(evaluated_result.length){
                    throw new Error('This subject has already been posted for this user')
                };  
            })
           check_duplicate_scores(result.scores)
           found_result.scores = found_result.scores.concat(result.scores)
           const saved_result = await found_result.save()
           res.status(201).send(saved_result)
        } else {
            //check duplicate from input
            check_duplicate_scores(result.scores)

            const new_result = new Result(result)
            const saved_result = await new_result.save()
            res.status(201).send(saved_result)
        }

    } catch (error) {
        next(error)
    }
})


//getting result by admin by searching for owner
router.get('', auth, checkAdmin,async (req,res,next)=>{
    try {
        const result = await Result.findOne({owner: req.query.owner, session: req.query.session})
        const {session, scores, owner: { username, sex, email, _id, class:Class} } = await result.populate('owner').populate('session').populate('scores.subject').execPopulate()
        res.send({session, studentReg: _id, username, sex, email, scores, Class})
    } catch (error) {
        next(error)
    }
})

//getting result by student
router.get('/student/:session_id',auth, async (req,res,next)=>{
    try {
        const result =await Result.findOne({owner: req.user._id, session: req.params.session_id})
        const { session, scores, owner: { username, sex, email, _id, class: Class } } = await result.populate('owner').populate('session').populate('scores.subject').execPopulate()
        res.send({ session, studentReg: _id, username, sex, email, scores, Class })
    } catch (error) {
        next(error)
    }
})

//getting all result by a lecturer
router.get('/lecturer/publishedresult', auth,checkLectAdmin, async(req,res,next)=>{
    try {
        const Allresult = await Result.find({})
        const PopulatedResult = Allresult.map((it)=>{
            return (it.populate('scores.subject').populate('owner').populate('session').execPopulate())
        })
        const arr = []
        for (let index = 0; index < PopulatedResult.length; index++) {
            const element =  await PopulatedResult[index];
            //filter scores array on each result 
            const filtered_result = element.scores.filter((it) => {
                return (it.subject.lecturer.toString() === req.user._id.toString())
            })

            const convertedElement = element.toObject()
            delete convertedElement.scores
            const {owner: {username, _id}, session: {year}} = convertedElement

            const modified_filtered_result = filtered_result.toObject().map((it)=>{
                return{...it, username, year, studentReg: _id}
            })
            arr.push(...modified_filtered_result)
          
        }
       
       res.send(arr).status(201)
    } catch (error) {
        next(error)
    }
})


//deleting result by admin
router.delete('/:owner/:resultId',auth,checkLectAdmin, async(req,res, next)=>{
    try{
        const owner = req.params.owner
        const resultId = req.params.resultId
        const result = await Result.findOne({owner: owner, 'scores._id': resultId})
        if (!result) {
            throw new Error('Result no longer exist')
        }

        const filtered_data = result.scores.filter(it=>it._id.toString() !== resultId.toString())
       
        result.scores = filtered_data
        const data = await result.save()
        res.send(data)
              
    } catch (error) {
        next(error)
    }
})



export default router