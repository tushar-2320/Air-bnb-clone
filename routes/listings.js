const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserror.js");
const listController=require("../controllers/listings.js");
//const review=require("../models/review.js");
const listing=require("../models/listings.js");
const{ValidateListing}=require("../middleware.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const uploads=multer({storage});

router.route("/").get(wrapasync(listController.index))
.post(isLoggedIn,uploads.single('listin[image][url]'),wrapasync (listController.newList));
router.get('/new' ,isLoggedIn,listController.renderNewForm);
router.route('/:id').put(uploads.single('listin[image][url]'),isLoggedIn,isOwner,listController.updateForm).get(listController.renderShowForm);
router.get('/:id/edit',isOwner,isLoggedIn,listController.renderEditForm);
module.exports=router;
 
 

