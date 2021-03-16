import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import User from '../models/User.js'


export default passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/facebook/cb',
    profileFields: ['id', 'last_name', 'email']
},  
    function (accessToken, refreshToken, profile, cb){
        User.findOne({ email: profile._json.email}, async (err, user)=>{
            if (user) {
               const token = await user.generateAuthToken()
               return cb(err, {...profile._json, validUser: user, token}) 
            } else {
                const user = {
                    username: profile._json.last_name,
                    email: profile._json.email,
                }
                const user_modeled = new User(user)
                const saved = await user_modeled.save()
                if (saved) {
                    const token = await saved.generateAuthToken()
                    cb(err, {...profile._json, validUser:saved, token})
                }
            }
            
        })
   
}))

