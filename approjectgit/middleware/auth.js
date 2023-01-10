const jwt=require('jsonwebtoken'); 

const User=require('../models/user');

exports.authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const user=jwt.verify(token,'u3h437843hf374y3yrhdfy3487347843yfh##@#4dfdwdsd32d#$Q#@cr3w#'); 
        User.findByPk(user.userId) 
        .then((user)=>{ 
            req.user=user ; 
            next();
            
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success:false})
    }
}