const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors=require('cors');
app.use(cors());

app.use(bodyParser.json({ extended: false }));

const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

app.listen(3000);