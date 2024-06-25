const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=3000;
const MONGO_URL="mongodb://127.0.0.1:27017/air_bnb";
const methodOverride=require("method-override");
const path=require('path');
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/expresserror.js");
const listingsroutes=require("./routes/listings.js");
const reviewroutes=require("./routes/review.js");
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

   
app.use("/listings",listingsroutes);
app.use("/listings/:id/reviews",reviewroutes);
    

app.get("/",(req,res)=>{
    console.log("enter the get request");
    res.send("i am app.js");

});

 
 app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not found"));

 });
 app.use((err,req,res,next)=>{ 
    let {statuscode=500,message="something went wrong"}=err;
   // res.status(statuscode).send(message);
   res.render("error.ejs",{err})
 });
app.listen(port,()=>{console.log(`listening on port:${port}`)});