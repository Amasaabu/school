import connectDb from './db/db.js'
import express from 'express'
import Subject from './models/Subject.js'
import Users from './models/User.js'
import {auth} from './middleware/auth.js'
import UserRouter from './routes/user.js'
import SubjectRouter from './routes/subject.js'
import ResultRouter from './routes/result.js'
import Session from './routes/session.js'
import path from 'path'
import FbStrategy from './Passport/strategy.js'
import passport from 'passport'
import cookieSession from 'cookie-session'
//facebook Auth Starting point
connectDb()
const app = express()
const port = process.env.PORT


app.use(express.json())

app.use(cookieSession({
    name: 'token',
    keys: ['key1']
}))
app.use('/user', UserRouter)
app.use('/subject', SubjectRouter)
app.use('/result', ResultRouter)
app.use('/session', Session)

app.get('/auth/facebook',passport.authenticate('facebook'));

app.get('/auth/facebook/cb',passport.authenticate('facebook', {session: false}),(req, res) => {
    req.session.cookietoken = req.user.token
    if (process.env.NODE_ENV==='/') {
        res.redirect()
    } else {
        res.redirect('http://localhost:3000')
    }
    
    });


const __dirname = path.resolve()

if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname, '/front/build/')))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, '/front', 'build', 'index.html' ))
    })
}




app.use((req,res,next)=>{
    res.status(404)
    const err = new Error("not found")
    next(err)
})
app.use((err,req,res,next)=>{
    const errorCode = res.statusCode ===200?500:res.statusCode
    console.log(err.message);
    res.status(errorCode)
    res.json({
        message: err.message,
        stack: err.stack
    })
})


app.listen(port, ()=>console.log(`server is runnung on port ${port}`))