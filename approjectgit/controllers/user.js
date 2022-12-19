
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
            if(user[0].Password==logindetails.password){
                return res.json({message:"login successfull"});
            }
            else{
                return res.json({message:"Password Is Incorrect"});
            }
        })
        .catch(result=>{
            console.log(result);
            return res.json({message:"Email Id Is Invalid"});
        })
    }
}