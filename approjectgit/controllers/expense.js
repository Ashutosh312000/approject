
const User=require('../models/user');

const Expense=require('../models/expense');


const isstringvalid=(string)=>{
    if(string=="" || string==undefined){
        return true;
    }
    else{
        return false;
    }
}

exports.getexpense=(req,res,next)=>{
    Expense.findAll()
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
    Expense.create({Amount:Amount,Description:Description,Catogary:Catogary})
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
    console.log(ExpenseId)
   Expense.destroy({where:{id:ExpenseId},force:true})
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
};