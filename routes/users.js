const express=require("express");
const router=express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport=require("passport");
const{savedredirectUrl}=require("../middleware.js");
const usercontroller=require("../controllers/users.js");
router.get("/signup",usercontroller.RenderSingupForm);
router.post("/signup",wrapasync(usercontroller.Singup));
router.get("/login",usercontroller.RenderLoginForm);
router.post("/login",savedredirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usercontroller.ToLogin);
router.get("/logout",usercontroller.Logout);
module.exports=router;