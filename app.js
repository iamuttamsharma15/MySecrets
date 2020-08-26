//jshint esversion:6
const express=require("express");

const app=express();
const ejs=require("ejs");

const bodyParser=require("body-parser");

const mongoose=require("mongoose");

const userDB=require("./database.js");
const { db } = require("./database.js");
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine","ejs");

app.use(express.static('public'));


//for home route
app.get("/",function(req,res){
    res.render("home");
})


//for login
app.get("/login",function(req,res){
    res.render("login");
})

//for registration
app.get("/register",function(req,res){



    res.render("register");
})

app.post("/register",function(req,res){
    var userName=req.body.username;
    var password=req.body.password;

    var newUser=new userDB({
        email:userName,
        password:password
    });

    newUser.save(function(err){
        if(!err)
        {
        
            res.render("secrets")
        }
        else
        {
            console.log(err);
        }
    })

})
app.post("/login",function(req,res){

    userDB.findOne({email:req.body.username},function(err,foundUser){
        if(!err)
        {
            if(foundUser)
            {
                if(foundUser.password===req.body.password)
                {
                    res.render("secrets");
                }
                else
                {
                    res.send("Wrong passWord!!");
                }
            }
            else
            {
                res.send("user Not Found!!")
            }
        }
    });
    
});



app.listen(3000,function(){
    console.log("server started on port3000");
})