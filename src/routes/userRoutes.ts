import express from 'express'
import { Request,Response } from 'express';
import verifyToken from '../middlewares/authMiddleware';
import authorizeRoles from '../middlewares/roleControlMiddleware';
import User from '../models/User';

const router = express.Router();


// only admins can access this route
router.get('/admin', verifyToken, authorizeRoles("admin"),(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome Admin"
    })
})

router.patch('/admin/changeRole',verifyToken, authorizeRoles("admin"),async(req:Request, res:Response)=>{
    const {email, role} = req.body
    
    if(!email || !role) {
        res.status(400).json({
            message: "Email and role are required"
        })
        return
    }

    try {
        const user = await User.findOne({email})
        
        if(!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        user.role = role
        await user.save()

        res.status(200).json({
            message: "User role updated successfully",
        })
        return

    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong"
        })
        return
    }
})

//only Managers and Admins can access this route
router.get('/manager', verifyToken , authorizeRoles("admin","manager"),(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome Manager"
    })
})

//only admins , managers and Users can access this route

router.get('/user', verifyToken, authorizeRoles("admin","manager","user"),(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome User"
    })
})


export default router;