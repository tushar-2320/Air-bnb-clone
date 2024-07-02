const express=require("express");
const router=express.Router();
const user=require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport=require("passport");
const{savedredirectUrl}=require("../middleware.js");
router.get("/signup",(req,res)=>{
res.render("./users/signup.ejs");
});
router.post("/signup",wrapasync(async (req,res)=>{
    try{
        let {username,email,password}=req.body;
const newuser=new user({email,username});
const registered=await user.register(newuser,password);
console.log(registered);
req.login(registered,(err)=>{
    if(err)
        {
            return next(err);
        }

req.flash("success","user was registered");
res.redirect("/listings");



});

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
router.post("/login",savedredirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),async (req,res)=>{
    console.log(req.user);
    req.flash("success","Welcome");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);

});
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>
    {
        if(err)
            {
               return next(err);
            }
            req.flash("success","you have been logged out");
            res.redirect("/listings");
    });

});
module.exports=router;