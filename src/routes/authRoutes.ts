import express from "express";
import { loginController,registerController } from "../controllers/authControllers";
import passport from "passport";
import { JwtPayload } from "jsonwebtoken";
import { Document } from 'mongoose';
import  jwt  from "jsonwebtoken";
import { Request, Response } from 'express';





const router = express.Router();

// Normal Registeration  
router.post('/register',registerController)

// Normal Login using JWT
router.post('/login',loginController)


// Google OAuth Login/Register

// Main route
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// redirect callback route
router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: '/' 
  }),
  (req: Request, res: Response) => {
    const user = req.user
    if(!user){
        res.status(401).json({
            message:"Something went wrong"
        })
    }
    // If authentication with google sucess generating JWT token to forward with response
    try {
        const token = jwt.sign({id:req.user?.id, role:req.user?.role}, process.env.JWT_SECRET as string ,{expiresIn:"1h"})

        res.status(200).json({
            message:"Login with google success",
            token:token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"something went wrong"
        })
    }
    
    
    
  }
)

export default router;