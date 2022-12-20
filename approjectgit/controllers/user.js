
const User=require('../models/user');
const bcrypt=require('bcrypt');

const isstringvalid=(string)=>{
    if(string=="" || string==undefined){
        return true;
    }
    else{
        return false;
    }
}

exports.postuser=(req,res,next)=>{
    
    const {name,email,password}=req.body.userdetails;
    if(isstringvalid(name) ||isstringvalid(email) || isstringvalid(password)){
       return res.json({message:'Fill Up The Blank Spaces'})
    }
    else{
        const saltrounds=10;
        bcrypt.hash(password,saltrounds, (err,hash)=>{
          User.create({Name:`${name}`,Email:`${email}`,Password:`${hash}`})
          .then(()=>{
            res.status(201).json({message:'Your Account Is Created'});
          })
          .catch((err)=>{
            res.json({message:'Email Already Exists'})
        })    
        })
    }
    
}

exports.loginuser=(req,res,next)=>{
    const {email,password}=req.body.logindetails;
    if(isstringvalid(email) || isstringvalid(password)){
       return res.json({message:'Fill Up The Blank Spaces'})
    }
    else{
        User.findAll({where:{Email:email}})
        .then(user=>{
            if(user.length>0){
                bcrypt.compare(password,user[0].Password,(err,result)=>{
                    if(result==true){
                        return res.status(200).json({message:"login successfull"});
                    }
                    else{   
                        return res.status(401).json({message:"User not authorized"});
                    }
                })
            }
            else{
                return res.status(404).json({message:"User not found"});
            }   
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}