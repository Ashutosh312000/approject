const path = require('path'); //go to password.js controller


const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User=require('./models/user');
const Expense=require('./models/expense');
const Order=require('./models/order');
const Filesdownloaded=require('./models/filesdownloaded');
const Forgotpasswordreq=require('./models/forgotpassword');

const cors=require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');
const filesRoutes = require('./routes/files');

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);
app.use('/files', filesRoutes);

User.hasMany(Expense);
Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Order);
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Forgotpasswordreq);
Forgotpasswordreq.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Filesdownloaded);
Filesdownloaded.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

sequelize
  // .sync({ force: true })
  .sync()
  .then(result=>{
    app.listen(3000);
  })
