import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const auth =async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const payLoad = jwt.verify(token, process.env.BCRYPTSECRETE)
        const user = await User.findOne({ _id: payLoad._id, ['tokens.token']: token})
        // console.log(user);
        if (!user){
            throw new Error
        }
        req.user = user
        next()
    } catch (err) {
        res.status(404)
        const error = new Error('please authenticate')
        next(error)
    }
}

export const checkAdmin=(req,res,next)=>{
    try {
        if (req.user.profileType !== 'admin') {
            res.status(401)
            // throw new Error('You are not authorized to make this request')
            const error = new Error('You are not authorized to make this request')
            next(error)
        }
        next()
    } catch (error) {
        next(error)
    }   
}

export const checkLectAdmin = (req,res,next)=>{
    try {
        if (req.user.profileType !== 'admin' && req.user.profileType !=='lecturer') {
            res.status(401)
            throw new Error('You are not authorized to make this request')
        }
        next()
    } catch (error) {
        next(error)
    }
} 
