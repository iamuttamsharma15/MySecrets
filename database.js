require("dotenv").config();
const mongoose =require("mongoose");


const encrypt=require("mongoose-encryption");

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

var userSchema=new mongoose.Schema({
    email:String,
    password:String
})

userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});

module.exports=mongoose.model("user",userSchema);