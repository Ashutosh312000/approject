
const User=require('../models/user');

const Expense=require('../models/expense');




exports.getuserleaderboard=async (req,res,next)=>{
   
    try{
        const users=await User.findAll();
        const expenses=await Expense.findAll();
        const userAggregatedExpenses={};

        expenses.forEach((expense) => { 
            if(userAggregatedExpenses[expense.userId]){ 
                userAggregatedExpenses[expense.userId]=userAggregatedExpenses[expense.userId]+expense.Amount;
            }
            else{
                userAggregatedExpenses[expense.userId]=expense.Amount;
            }
        });

        var userleaderboardDetails=[]; 
        users.forEach((user)=>{
            userleaderboardDetails.push({name:user.Name,total_cost:userAggregatedExpenses[user.id]})
           
        })
        userleaderboardDetails.sort((a,b)=>b.total_cost - a.total_cost)
        res. status (200).json(userleaderboardDetails)

        
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}