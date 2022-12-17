const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const cors=require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

sequelize
//   .sync({ force: true })
  .sync()
  .then(result=>{
    app.listen(3000);
  })
