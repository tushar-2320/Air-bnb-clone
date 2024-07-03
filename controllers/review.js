const listing=require("../models/listings.js");
const review=require("../models/review.js");
module.exports.AddReviews=async(req,res)=>{
    let list=await listing.findById(req.params.id);
    let rev=new review(req.body.reviews);
    rev.Author=req.user._id;
    list.reviews.push(rev);
    await rev.save();
    await list.save();
    res.send("review saved");
    //console.log(req.body);
    res.redirect("/listings/:id");

 }
 module.exports.DeleteReviews=async(req,res)=>{
    let {id,rid}=req.params;
    console.log(req.params);
    console.log("entered delete");
    await listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
    await review.findByIdAndDelete(rid);
    res.redirect(`/listings/${id}`);
 }