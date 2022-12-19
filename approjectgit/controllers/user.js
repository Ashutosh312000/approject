
const User=require('../models/user');

exports.postuser=(req,res,next)=>{
    userdetails=req.body.userdetails;
    if(userdetails.name=="" || userdetails.email=="" || userdetails.password==""){
       return res.json({message:'Fill Up The Blank Spaces'})
    }
    else{
        User.create({Name:`${userdetails.name}`,Email:`${userdetails.email}`,Password:`${userdetails.password}`})
    .then(()=>{
        res.status(201).json({message:'Your Account Is Created'});
    })
    .catch((err)=>{
        res.json({message:'Email Already Exists'})
    })
    }
    
}

exports.loginuser=(req,res,next)=>{
    logindetails=req.body.logindetails;
    if(logindetails.email=="" || logindetails.password==""){
       return res.json({message:'Fill Up The Blank Spaces'})
    }
    else{
        User.findAll({where:{Email:logindetails.email}})
        .then(user=>{
            if(user.length>0 & user[0].Password==logindetails.password){
                return res.status(200).json({message:"login successfull"});
            }
            else{
                return res.status(401).json({message:"User not authorized"});
            }
        })
        .catch(result=>{
            return res.status(404).json({message:"User not found"});
        })
    }
}