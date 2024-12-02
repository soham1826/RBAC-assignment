import mongoose from "mongoose"

const dbConnection = async()=>{
    //Function for handling connection with DB
    try{
        const connect  = await mongoose.connect(process.env.MONGODB_URL as string)
        console.log(`Database connected:${connect.connection.host}, ${connect.connection.name}`) 
    }catch(err){
        console.log(err)
        process.exit(1)
    }   
    
}   

export default dbConnection