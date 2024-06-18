const mongoose=require('mongoose');
const initdata=require('./data.js');
const listing=require('../models/listings.js');
const MONGO_URL="mongodb://127.0.0.1:27017/air_bnb";
main().then(()=>{console.log("connected to db");

}).catch((err)=>{console.log(err);})
async function main()
{
   await mongoose.connect(MONGO_URL);
}
const initdb =async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
};
initdb();