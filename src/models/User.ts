import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:["admin","manager","user"]
    },
    googleId:{
        type:String,
        sparse:true,
        unique:true
    }
},{
    timestamps:true
});

export default mongoose.model("User",userSchema);

