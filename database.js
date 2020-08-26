const mongoose =require("mongoose");

const encrypt=require("mongoose-encryption");

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

var userSchema=new mongoose.Schema({
    email:String,
    password:String
})
var secret="thisisonlysecretkey";
userSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});

module.exports=mongoose.model("user",userSchema);