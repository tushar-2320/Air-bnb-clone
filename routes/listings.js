const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserror.js");
const listController=require("../controllers/listings.js");
//const review=require("../models/review.js");
const listing=require("../models/listings.js");
const{ValidateListing}=require("../middleware.js");
const {isLoggedIn,isOwner}=require("../middleware.js");

    
router.get('/',wrapasync(listController.index));
router.get('/new' ,isLoggedIn,listController.renderNewForm);
router.get('/:id/edit',isOwner,isLoggedIn,listController.renderEditForm);
router.put('/:id',ValidateListing,isLoggedIn,isOwner,listController.updateForm);
router.get('/:id',listController.renderShowForm);
router.post('/',isLoggedIn,ValidateListing,wrapasync (listController.newList));
 module.exports=router;
 
 

