const express=require("express");
const router=express.Router();
const user=require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport=require("passport");
router.get("/signup",(req,res)=>{
res.render("./users/signup.ejs");
});
router.post("/signup",wrapasync(async (req,res)=>{
    try{
        let {username,email,password}=req.body;
const newuser=new user({email,username});
const registered=await user.register(newuser,password);
console.log(registered);
req.flash("success","user was registered");
res.redirect("/listings");

    }
    catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));
router.get("/login",(req,res)=>{
res.render("./users/login.ejs");
});
router.post("/login",passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),async (req,res)=>{
    req.flash("success","Welcome");
    res.redirect("/listings");

});
module.exports=router;