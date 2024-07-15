const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserror.js");
const review=require("../models/review.js");
const {Validatereview,isLoggedIn,isAuthor}=require("../middleware.js");
const listing=require("../models/listings.js");
const ReviewController=require("../controllers/review.js");

    router.post('/',isLoggedIn,wrapasync(ReviewController.AddReviews));
    router.delete('/:rid',isLoggedIn,isAuthor,wrapasync(ReviewController.DeleteReviews));
    module.exports=router;