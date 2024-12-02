import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import dbConnection from './config/dbConnection'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import passport from 'passport'
import './config/passportConfig'


const app = express();

dbConnection(); //DB connection initialized

//Middlewares
app.use(express.json());
app.use(passport.initialize());

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

//Starting server
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})