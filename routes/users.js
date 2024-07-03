const express=require("express");
const router=express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport=require("passport");
const{savedredirectUrl}=require("../middleware.js");
const usercontroller=require("../controllers/users.js");
router.route("/signup").get(usercontroller.RenderSingupForm).post(wrapasync(usercontroller.Singup));
router.route("/login").get(usercontroller.RenderLoginForm).post(savedredirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usercontroller.ToLogin);
router.get("/logout",usercontroller.Logout);
module.exports=router;