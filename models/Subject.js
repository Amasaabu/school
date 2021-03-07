import mongoose from 'mongoose'

const SubjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        unique: true
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})



const Subject = mongoose.model('Subject', SubjectSchema)

export default Subject