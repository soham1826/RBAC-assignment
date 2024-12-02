import { Request,Response ,NextFunction} from 'express'
import User from '../models/User';



const ChangeRoleController = async (req:Request , res:Response, next:NextFunction) => {
    //function to handle Role-Changing Functionality
    try {
        const { email, role } = req.body;

        if (!email || !role) {
            return res.status(400).json({ message: "Email and role are required." });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Updating the role
        user.role = role;
        await user.save();

        return res.status(200).json({
            message: "Role updated successfully.",
            user: {
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error updating role:", error);
        next(error); 
    }
}

export default ChangeRoleController;