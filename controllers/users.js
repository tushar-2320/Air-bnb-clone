const user=require("../models/user.js");
module.exports.RenderSingupForm=(req,res)=>{
    res.render("./users/signup.ejs");
    }
    module.exports.Singup=async (req,res)=>{
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
    }
    module.exports.RenderLoginForm=(req,res)=>{
        res.render("./users/login.ejs");
        }
     module.exports.ToLogin=   async (req,res)=>{
            console.log(req.user);
            req.flash("success","Welcome");
            let redirectUrl=res.locals.redirectUrl||"/listings";
            res.redirect(redirectUrl);
        

        }
        module.exports.Logout=(req,res,next)=>{
            req.logout((err)=>
            {
                if(err)
                    {
                       return next(err);
                    }
                    req.flash("success","you have been logged out");
                    res.redirect("/listings");
            });
        
        }