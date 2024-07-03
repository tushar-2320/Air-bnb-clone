const listing=require("../models/listings.js");
module.exports.index=async (req,res)=>{
    const  alllistings =await listing.find();
   // console.log(alllistings);
    res.render('./listings/index.ejs',{alllistings});

}
module.exports.renderNewForm=(req,res)=>{

    res.render("./listings/new.ejs");
}
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    res.render("./listings/edit.ejs",{list});
}
module.exports.updateForm=async (req,res)=>{
    let {id}=req.params;
    console.log("entered the put method");
    await listing.findByIdAndUpdate(id,{...req.body.list});
    console.log("updated");
    res.redirect('/listings');
}
module.exports.renderShowForm=async (req,res)=>{
    let {id} =req.params;
    const list=await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    res.render("./listings/show.ejs",{list}); 
}
module.exports.newList=async (req,res,next)=>{

    
    let  listin=req.body.listin;
    const newlist=new listing(listin);
    console.log(newlist);
    newlist.owner=req.user._id;
    await newlist.save();
    console.log(listin);
    req.flash("success","new listing created");
    res.redirect("/listings");

 }