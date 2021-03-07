import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
    const connection = await mongoose.connect(process.env.LOCAL_CONNECT_URL ,{
    useNewUrlParser: true,
    useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true   
    })
    console.log(`database server is running ${connection.connection.host}`)
    } catch(e){
        console.log(e.message);
    }
    
}

export default connectDb

// export default mongoose.connect('mongodb://127.0.0.1:27017/School', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }).then(data => console.log(`connected on ${data.connection.host}`)).catch(e => console.log(e))


