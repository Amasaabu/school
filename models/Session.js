import mongoose from 'mongoose'

const session = new mongoose.Schema({
    year: {
        type: String,
        required: true
    }
})

const Session = mongoose.model('Session', session)

export default Session