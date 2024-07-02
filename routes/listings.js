const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const {listingSchema}=require("../schemavalidation.js");
const ExpressError=require("../utils/expresserror.js");
//const review=require("../models/review.js");
const listing=require("../models/listings.js");
const {isLoggedIn}=require("../middleware.js");
const ValidateListing=(req,res,next)=>
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
    
router.get('/',async (req,res)=>{
    const  alllistings =await listing.find();
   // console.log(alllistings);
    res.render('./listings/index.ejs',{alllistings});

});
router.get('/new' ,isLoggedIn, (req,res)=>{

    res.render("./listings/new.ejs");


});
router.get('/:id/edit',isLoggedIn,async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    res.render("./listings/edit.ejs",{list});
});
router.put('/:id',isLoggedIn,ValidateListing ,async (req,res)=>{
    let {id}=req.params;
    console.log("entered the put method");
    await listing.findByIdAndUpdate(id,{...req.body.list});
    console.log("updated");
    res.redirect('/listings');
});
router.get('/:id',async (req,res)=>{
    let {id} =req.params;
    const list=await listing.findById(id).populate("reviews").populate("owner");
    res.render("./listings/show.ejs",{list}); 
});
router.post('/',isLoggedIn,ValidateListing,wrapasync (async (req,res,next)=>{

    
    let  listin=req.body.listin;
    const newlist=new listing(listin);
    console.log(newlist);
    newlist.owner=req.user._id;
    await newlist.save();
    console.log(listin);
    req.flash("success","new listing created");
    res.redirect("/listings");

 }));
 module.exports=router;
 
 

