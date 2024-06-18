const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listings.js");
const port=3000;
const MONGO_URL="mongodb://127.0.0.1:27017/air_bnb";
const methodOverride=require("method-override");
const path=require('path');
const wrapasync=require("./utils/wrapasync.js");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/expresserror.js");
const {listingSchema}=require("./schema.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,'/public')));
app.engine("ejs",ejsMate);

main().then(()=>{console.log("connected to db");

}).catch((err)=>{console.log(err);})
async function main()
{
   await mongoose.connect(MONGO_URL);
}
const ValidateListing=(req,res,next)=>
    {
        let result=listingSchema.validate(req.body);
    if(result.error)
        {
            throw new ExpressError(400,result.error);
        }
        else
        {
            next();
        }


    }

app.get("/",(req,res)=>{
    console.log("enter the get request");
    res.send("i am app.js");

});
// app.get("/testlist",async (req,res)=>{
//     mylists=new listing({
//         title:"my home",
//         description:"by the beach",
//         price:1200,
//         location:"goa",
//         country:"india"
//     });
//     await mylists.save();
//     console.log("sample was saved");
//     res.send("success");
// })
app.get('/listings',async (req,res)=>{
    const  alllistings =await listing.find();
   // console.log(alllistings);
    res.render('./listings/index.ejs',{alllistings});

});
app.get('/listings/new' , (req,res)=>{
    res.render("./listings/new.ejs");


});
app.get('/listings/:id/edit',async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    res.render("./listings/edit.ejs",{list});
});
app.put('/listings/:id',ValidateListing ,async (req,res)=>{
    let {id}=req.params;
    console.log("entered the put method");
    await listing.findByIdAndUpdate(id,{...req.body.list});
    console.log("updated");
    res.redirect('/listings');
});
app.get('/listings/:id',async (req,res)=>{
    let {id} =req.params;
    const list=await listing.findById(id);
    res.render("./listings/show.ejs",{list}); 
});
// app.put('/listings/:id',async (req,res)=>{
//     let {id}=req.params;
//     await listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect('/listings');
// })
app.post('/listings',ValidateListing,wrapasync (async (req,res,next)=>{

    
    let  listin=req.body.listin;
    const newlist=new listing(listin);
    await newlist.save();
     console.log(listin);
     res.redirect("/listings");

 }));
 app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not found"));

 });
 app.use((err,req,res,next)=>{ 
    let {statuscode=500,message="something went wrong"}=err;
   // res.status(statuscode).send(message);
   res.render("error.ejs",{err})
 });
app.listen(port,()=>{console.log(`listening on port:${port}`)});