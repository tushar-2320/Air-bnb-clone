const PassportLocalMongoose=require("passport-local-mongoose");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
});
userSchema.plugin(PassportLocalMongoose);
module.exports=mongoose.model("user",userSchema);