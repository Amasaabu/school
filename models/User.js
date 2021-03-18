import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validate from 'validator'

const tokenSchema = new mongoose.Schema({
    token: {type: String}
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    sex: {
        type:String,
        validate(value) {
            if (value!=='Male'&& value!=='Female'){
                throw new Error('Invalid enteries')
            }
        }
    },
    class: {
        type: String
    },
    password: {
        type: String,
        minlength: [7, 'Invalid Password']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    class: { type: String },
    profileType: {
        type: String,
        required: true,
        default: 'student'
    },
    profileImage: {
        type: String
    },
    tokens: [tokenSchema]
})


UserSchema.statics.findByCredentials =async (email, password)=>{
    const user = await User.findOne({email: email})
    if (!user) {
        throw new Error('Invalid email credentials')
    }
    const verifyPassoword = await bcrypt.compare(password, user.password)
    if (verifyPassoword){
         return user
    }
   
    throw new Error('Invalid password credentials')
}



UserSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.BCRYPTSECRETE)
    this.tokens = this.tokens.concat({token})

    await this.save()
    return token
}


// UserSchema.virtual('results',{
//     ref: 'Result',
//     localField: '_id',
//     foreignField: 'owner'
// })

UserSchema.virtual('subjects',{
    ref:'Subject',
    localField: '_id',
    foreignField: 'lecturer'
})


UserSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})


const User = mongoose.model('User', UserSchema)

export default User