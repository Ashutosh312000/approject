const express = require('express');

const userController = require('../controllers/admin');

const router = express.Router();


router.get('/add-product', userController.get);

module.exports = router;