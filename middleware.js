const listing=require("./models/listings.js");
const review=require("./models/review.js");
const {listingSchema,reviewSchema}=require("./schemavalidation.js");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated())
    {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in");
        return res.redirect("/login");
    }
    next();

    }
    module.exports.savedredirectUrl=(req,res,next)=>{
        if(req.session.redirectUrl)
            {
                res.locals.redirectUrl=req.session.redirectUrl;
            }
        next();
    }
    module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let l=await listing.findById(id);
    if(!l.owner.equals(res.locals.currUser._id))
        {
            req.flash("error","you are not authorized to edit it.");
            return res.redirect(`/listings/${id}`);
        }
        next();
    }
   module.exports.ValidateListing=(req,res,next)=>
        {
         let result=listingSchema.validate(req.body);
        // console.log(req.body);
         if(result.error)
            {
               // console.log(result.error);
                throw new ExpressError(400,result.error);
            }
          else
            {
                next();
            }
    
    

        }
        module.exports.Validatereview=(req,res,next)=>
            {
                let result=reviewSchema.validate(req.body);
                if(result.error)
                {
                    throw new ExpressError(400,result.error);
                }
                else
                {
                    next();
                }
        
        
            }
            module.exports.isAuthor=async (req,res,next)=>{
                let {id,rid}=req.params;
                let l=await review.findById(rid);
                if(!l.Author.equals(res.locals.currUser._id))
                    {
                        req.flash("error","you are not authorized to edit it.");
                        return res.redirect(`/listings/${id}`);
                    }
                    next();
                }