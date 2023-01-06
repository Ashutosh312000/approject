const path = require('path'); 

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User=require('./models/user');
const Expense=require('./models/expense');
const Order=require('./models/order');

const cors=require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Order);
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

sequelize
  // .sync({ force: true })
  .sync()
  .then(result=>{
    app.listen(3000);
  })
