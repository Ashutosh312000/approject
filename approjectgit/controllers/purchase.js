
const User=require('../models/user');

const Expense=require('../models/expense');

const Order=require('../models/order');

const Razorpay=require('razorpay')//we need to install razorpay



const isstringvalid=(string)=>{
    if(string=="" || string==undefined){
        return true;
    }
    else{
        return false;
    }
}
//see hmne kese async bnaya fir try catch ko use kia and await use krngay
exports.getpremiummembership= async (req, res, next)=>{
    try{
        var rzp=new Razorpay({ //yeh treeka hai razorpay ko objct ki form m login krke btane ka ki is website se a rha
            key_id: 'rzp_test_73VtqPMeQF1aOI',
            key_secret: 'SI4MgdX1MDfjyOjd8lndSaqM'
        })
        const amount=2500; // paise bhi jate hai 2500 krna hoga 25rs ke liye

        rzp.orders.create({amount,currency:"INR"},(err,order)=>{ //yeh treeka hai order bnane ka jab succesfull hojayga
            //to ek order object ayega jismein order id hogi
            if(err){
                throw new Error(JSON.stringify(err));
            }
             //hm ek aur order table bnayngay (one to many relationship between user and order)
             //it will be similer to user to expense (cheak modals) and niche hm order table m status pending dalngay
             //coz payment abhi tk hui nhi hai, hm order id ko database , bhi save ke rhe hai
            req.user.createOrder({orderid:order.id, status:'PENDING'}).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})//we are sending order and api key id to frontend 
                //for the payment part, hm rwzorpay ka frontend bulayngay
            }).catch(err=>{
                throw new Error(err);
            })
        })
        
    }
    catch(err){
        console.log(err);
        res.status(403).json({message:'something went wrong',error:err})
    }
}

exports.updatetransactionstatus=async(req,res,next)=>{ //!)you need to update the the order table with payment id coming from frontend
    //2)you need to to make user to a premium user in user table 
    try{
        const {payment_id,order_id}=req.body;

        const updateorder=Order.findOne({where : {orderid: order_id} }) //1st priomise
        .then(order => {
           return order.update({paymentid:payment_id,status:"SUCCESSFULL"});
        })
        
        const updateuserpremium=req.user.update({ispremiumuser:true}); //2nd promise

        Promise.all([updateorder,updateuserpremium]) //we are using promise.all
        .then(()=>{
            return res.status(202).json({success:true,message :"Transaction Successful"})
        })
        .catch((err)=>{
            console.log(err);
            throw new Error(err);
        })
    }
    catch(err){
        console.log(err);
        throw new Error(err);
    }
}

exports.updatetransactionstatusfailed=async(req,res,next)=>{ 
    try{
        await Order.findOne({where : {orderid: req.body.order_id} })
        .then(order => {
           return order.update({status:"Failed"});
        })
        .then(()=>{
            return res.status(202).json({success:true,message :"Transaction Failed"})
        })
        .catch(err=>console.log(err))
    }
    catch(err){
        console.log(err);
        throw new Error(err);
    }
}