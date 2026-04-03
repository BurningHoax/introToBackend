import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
const router = Router();

router.route("/register").post(registerUser); //post is the http method that's why
router.route("/login").post(loginUser); 
router.route("/logout").post(logoutUser); //because we can't really delete data,, we defined the method of logiut and some data is created, hence post

export default router;
