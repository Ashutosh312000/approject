
const User=require('../models/user');

const Expense=require('../models/expense');
const sequelize = require('../util/database');
const sgMail = require('@sendgrid/mail')


exports.forgotpassword=async (req,res,next)=>{
    try{
        sgMail.setApiKey('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')

const msg = {
  to: `${req.body.email}`, // Change to your recipient
  from: 'ashutosh123asd@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })

        
    }
    catch(err){
        console.log(err);
        // res.status(500).json(err);
    }
}