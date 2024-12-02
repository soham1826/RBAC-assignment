import bcrypt from 'bcrypt'
import { Request,Response } from 'express'
import User from '../models/User';
import jwt from 'jsonwebtoken'




const registerController = async(req:Request,res:Response)=>{
    //Function to handle registration process
    try {
        const{email,password,role} = req.body; 

        if(!email || !password || !role){
            res.status(400).json({
                message:"All fields are required"
            })
        }

        const Exisistuser = await User.findOne({email:email})
        const passwordHash = await bcrypt.hash(password,10);// Hashing password for security
        
        //If user is not found making new user
        if(!Exisistuser){
            const newUser = new User({
                email:email,
                password:passwordHash, 
                role:role
                
            })
            await newUser.save();

            res.status(201).json({
                message:"Registered Successfully, You can now Log in"
            })
        }else{
            res.status(409).json({
                message:"User already exsists with this mail"
            })
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
    

}

const loginController = async(req:Request, res:Response)=>{
    //Function to handle login process
    try {
       const {email, password} = req.body;

       if(!email || !password){
        res.status(400).json({
            message:"All fields are required"
        })
       }

       const user = await User.findOne({email});

       if(user && user.password){
        const isMatch = await bcrypt.compare(password , user.password) // Using bcrypt to verify password

        if(!isMatch){
            res.status(401).json({
                message:"Invalid Credentials"
            })
        }

        //JWT Token creation
        const token = jwt.sign({id:user._id , role:user.role},process.env.JWT_SECRET as string  , {expiresIn:"1h"})

        res.status(200).json({
            message:"LoggedIn successfully",
            token:token
        })

       }else{
        res.status(404).json({
            message:"User not found"
        })
       }

    } catch (error) {
        console.log(error);
    }
}



export {registerController,loginController}


