
const User=require('../models/user');

exports.postuser=(req,res,next)=>{
    userdetails=req.body.userdetails;
    User.create({Name:`${userdetails.name}`,Email:`${userdetails.email}`,Password:`${userdetails.password}`})
    .then(()=>{
        res.status(201).json({message:'Your Account Is Created'});
    })
    .catch((err)=>{
        res.json({message:'Email Already Exists'})
    })
}