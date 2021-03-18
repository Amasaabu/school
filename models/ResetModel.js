import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const tokenSchema = new mongoose.Schema({
    token : {
        type: String
    }
})

const ResetModel = new mongoose.Schema({
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'User'
    },
    tokens: [tokenSchema]
})

ResetModel.methods.generateResetToken = async function(){
    const token = await jwt.sign({_id: this.user_id.toString()}, process.env.BCRYPTSECRETE)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

const ResetModelSchema = mongoose.model('ResetModel', ResetModel)

export default ResetModelSchema