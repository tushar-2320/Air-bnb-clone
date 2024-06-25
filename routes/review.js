const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserror.js");
const review=require("../models/review.js");
const {listingSchema,reviewSchema}=require("../schemavalidation.js");
const listing=require("../models/listings.js");
const Validatereview=(req,res,next)=>
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
    router.post('/',Validatereview,wrapasync(async(req,res)=>{
        let list=await listing.findById(req.params.id);
        let rev=new review(req.body.reviews);
        list.reviews.push(rev);
        await rev.save();
        await list.save();
        res.send("review saved");
        //console.log(req.body);
        res.redirect("/listings/:id");
    
     }));
     router.delete('/:rid',wrapasync(async(req,res)=>{
        let {id,rid}=req.params;
        console.log(req.params);
        console.log("entered delete");
        await listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
        await review.findByIdAndDelete(rid);
        res.redirect(`/listings/${id}`);
     }));
     module.exports=router;