import mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema({
    score: { type: Number, default: 0},
    subject: {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Subject'}
})


const ResultSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    session: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Session' },
    scores: [scoreSchema],
})


const Result = mongoose.model('Result', ResultSchema)

export default Result