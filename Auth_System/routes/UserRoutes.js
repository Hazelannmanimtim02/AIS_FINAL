// import * as UserController from "../controllers/UserController.js";
// import express from "express";

// const userRoutes = express.Router();

// userRoutes.post('/register', UserController.register);
// userRoutes.post('/login', UserController.login);

// export default userRoutes;


import express from "express";
import * as UserController from "../controllers/UserController.js";

const userRoutes = express.Router();

// DEBUG SAFE CHECK (optional but helpful)
console.log("UserController loaded:", UserController);

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);

export default userRoutes;