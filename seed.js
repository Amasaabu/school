import mongoose from 'mongoose'
import connectDb from './db/db.js'
import Users from './models/User.js'
import Result from './models/Result.js'
import Subject from './models/Subject.js'


connectDb()

const userSample = [{
    username: 'Ade',
    email: 'ade.ade@ade.com',
    password: 'sdafsdfzfdsf'
},
{
    username: 'musa',
    email: 'asas@asas.com',
    password: 'sda121asd'
},
{
    username: 'shade',
    email: 'ade.admin@ade.com',
    password: 'sdafsdsacf',
    profileType: 'lecturer'
}]

const subjectSample = [{
    subjectName: 'English',
    lecturer: '600ec541b136484d1c52323a'
},
{
    subjectName: 'Mathematics',
    lecturer: 'Mr.Kcee'
}]

const resultSample = []

const plant = async()=>{
    await Users.deleteMany()
    await Subject.deleteMany()
    await Result.deleteMany()
    
    try{
        const user = await Users.insertMany(userSample)
        const subject = subjectSample.map((it)=>{
            return(
                {...it, lecturer: user[2]._id}
            )
        })
       const uploadedSubject = await Subject.insertMany(subject)

        resultSample.push({
            owner: user[2]._id,
            scores: [{
                score: 45,
                subject: uploadedSubject[0]._id,
            }
        ]
        })
        const t = await Result.insertMany(resultSample)

    } catch(e){
        console.log(e);
    }
}

const destroy = async()=>{
    try {
        await Users.deleteMany()
        await Subject.deleteMany()
        await Result.deleteMany()
        console.log('successfully deleted many');
    } catch (error) {
        console.log(error)
    }
}



if (process.argv[2]=='-d'){
    destroy()
} else{
    plant()
}
