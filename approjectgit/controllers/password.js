
const User=require('../models/user');

const Expense=require('../models/expense');
const sequelize = require('../util/database');




exports.forgotpassword=async (req,res,next)=>{
   
    try{
        console.log('hii')

        
    }
    catch(err){
        console.log(err);
        // res.status(500).json(err);
    }
}