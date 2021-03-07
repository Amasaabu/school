import express from 'express'
import Subject from '../models/Subject.js'
import Users from '../models/User.js'
import { auth, checkAdmin } from '../middleware/auth.js'
import User from '../models/User.js'
import Result from '../models/Result.js'
import Session from '../models/Session.js'

const router = new express.Router()

router.post('',auth, checkAdmin, async (req,res, next)=>{
    try {
    const session = new Session(req.body)
    const saved_session = await session.save()
    res.send(saved_session)
    } catch (error) {
        next(error)
    }
    
})

router.get('', auth, async (req,res,next)=>{
    try {
        const sessions = await Session.find({})
        res.send(sessions)
    } catch (error) {
        next(error)
    }
})

export default router

