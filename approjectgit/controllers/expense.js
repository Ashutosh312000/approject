
const User=require('../models/user');

const Expense=require('../models/expense');

const Filesdownloaded=require('../models/filesdownloaded');



const UserServices=require('../services/userservices')
const S3Services=require('../services/S3services')



const isstringvalid=(string)=>{
    if(string=="" || string==undefined){
        return true;
    }
    else{
        return false;
    }
}



exports.getexpense=(req,res,next)=>{ 
    req.user.getExpenses() 
    .then((expense)=>{
        res.status(200).json(expense);
    })
    .catch(err=>console.log(err))
}


exports.postexpense=(req,res,next)=>{
   const {Amount,Description,Catogary}=req.body.expensedetails;
   if(isstringvalid(Amount) ||isstringvalid(Description) || isstringvalid(Catogary)){
    return res.json({message:'Fill Up The Blank Spaces'})
 }
 else{
    Expense.create({Amount:Amount,Description:Description,Catogary:Catogary ,userId:req.user.id })
    .then((expense)=>{
        res.status(201).json({message:"Expense Is Added",expense})
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({message:"Something Is Wrong"})
    })
 }

}

exports.deleteAddExpense = (req, res, next) => {
    const ExpenseId=parseFloat(req.params.ExpenseId); 
    req.user.getExpenses({where:{id:ExpenseId}})
    .then((expenses)=>{
        if(expenses.length <1){
            return res.json({message:"this expense does not exist"})
        }
        else{ 
        Expense.destroy({where:{id:ExpenseId},force:true})
        .then(result => {
          return res.json(result);
        })
        .catch(err => console.log(err));
        }
       
    })
    .catch(err => console.log(err));
};

exports.downloadexpense=async(req,res,next)=>{
    try{
        const userId=req.user.id
        const expenses = await UserServices.getexpenses(req);
    const stringifiedExpenses=JSON.stringify(expenses);
                                                    
        const filename=`Expense${userId}/${new Date()}.txt`; 
        const fileURL= await S3Services.uploadtoS3(stringifiedExpenses,filename);   
        
        const Linkupload=await Filesdownloaded.create({Link:fileURL,userId:userId});
        
        res.status(200).json({fileURL,success:true})              
    
    }
    catch(err){ 
        console.log(err)
        res.status(500).json({message:'failed',fileURL:'',err})
    }
   
}

