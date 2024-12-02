# **Role-Based Access Control (RBAC) System**

A secure and robust authentication and authorization system implementing Role-Based Access Control (RBAC) using **Node.js**, **Express**, and **TypeScript**.

---
## **Table of Contents** 
- [1.Features](#features)
- [2.Tech Stack](#tech-stack)
- [3.Directory Structure](#directory-structure)
- [4.API Endpoints](#api-endpoints)
- [5.Role Hierarchy](#role-hierarchy)
- [6.Setup and Installation](#setup-and-installation)
- [6.License Details](#license-details)
---

## **Features**

### **User Authentication**
- Secure user registration and login.
- JWT-based authentication for session-less, scalable security.
- Password hashing using **bcrypt** for enhanced security.

### **Role-Based Authorization**
- Three-tier role system: **Admin**, **Manager**, **User**.
- Role-specific route access for restricted areas of the system.
- Middleware to validate and authorize user access.

### **Role Management**
- Admins can update user roles dynamically.
- Clear role hierarchy with restricted access enforcement.
- Middleware for role-based request validation.

### **Google OAuth Authentication**
- Support for Google Sign-In using **Passport.js**.
- Default role assignment for Google users: **User**.
- Unified user management for email/password and Google accounts.

---

## **Tech Stack**
- **Backend**:  
  ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)  
  ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white)

- **Database**:  
  ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)

- **Authentication**:  
  ![JWT](https://img.shields.io/badge/-JWT-white?logo=jsonwebtokens&logoColor=black)  
  ![Passport.js](https://img.shields.io/badge/-Passport.js-34E27A?logo=passport&logoColor=white)

- **Programming Language**:  
  ![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white)

- **Security**:  
  ![Bcrypt](https://img.shields.io/badge/-Bcrypt-yellow)

---

## **Directory Structure**
```
RBAC-assignment/
├── src/
│   ├── config/
│   │   ├── dbConnection.ts          # MongoDB connection configuration
│   │   └── passportConfig.ts        # Passport.js Google OAuth setup
│   │
│   ├── controllers/
│   │   ├── authController.ts        # Authentication logic (register/login/logout)
│   │   └── roleController.ts        # Role management logic
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts        # JWT and Google OAuth verification
│   │   └── roleControlMiddleware.ts # Role-based access control logic
│   │
│   ├── models/
│   │   └── User.ts                  # Mongoose schema for user accounts
│   │
│   └── routes/
│       ├── authRoutes.ts            # Routes for authentication endpoints
│       └── userRoutes.ts            # Routes for user-specific endpoints
│
├── .env                            # Environment variables
├── package.json
└── README.md



```
---

## **API Endpoints**

### **Authentication Routes**
- `POST /auth/register` &nbsp;![POST](https://img.shields.io/badge/-POST-blue)
   - Registers a new user with **email**, **password**, and **role**.

- `POST /auth/login` &nbsp;![POST](https://img.shields.io/badge/-POST-blue)
   - Authenticates a user with **email** and **password**, returning a JWT.

- `POST /auth/logout` &nbsp;![POST](https://img.shields.io/badge/-POST-blue)
   - Clears the user's session (client-side implementation required).

- `GET /auth/google` &nbsp;![GET](https://img.shields.io/badge/-GET-green)
   - Initiates Google OAuth login process.

- `GET /auth/google/callback` &nbsp;![GET](https://img.shields.io/badge/-GET-green)
   - Handles the callback after Google OAuth authentication.

---

### **Role-Based Routes**
#### Accessible to users based on roles:
- `GET /user` &nbsp;![GET](https://img.shields.io/badge/-GET-green)
   - Accessible to all authenticated users.

- `GET /manager` &nbsp;![GET](https://img.shields.io/badge/-GET-green)
   - Accessible to managers and admins.

- `GET /admin` &nbsp;![GET](https://img.shields.io/badge/-GET-green)
   - Admin-only access.

- `PATCH /admin/changeRole` &nbsp;![PATCH](https://img.shields.io/badge/-PATCH-yellow)
   - Admins can modify a user's role.

---
## **Role Hierarchy**

1. **Admin**  
   - Full system access.  
   - Can modify user roles.  
   - Access to all routes.

2. **Manager**  
   - Access to user and manager routes.  
   - Cannot modify roles.

3. **User**  
   - Basic access rights to user-specific routes only.

---

## **Setup and Installation**

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/soham1826/RBAC-assignment.git
   cd RBAC-asssignment

## Install Dependencies

1. **Install dependencies**:  
   ```bash
   npm install


2. **Set up environment variables**:  
   Create a `.env` file in the root directory with:
   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Access the server**:
   Navigate to http://localhost:3000 in your browser or Postman.

## **License Details** 

This project is licensed under the **MIT License**.  

You are free to use, modify, and distribute this project as per the license terms. See the [LICENSE](LICENSE.txt) file for more details.



