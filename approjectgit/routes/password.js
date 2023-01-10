const express = require('express');

const passwordController = require('../controllers/password');

// const userauthentication=require('../middleware/auth')

const router = express.Router();


router.post('/forgotpassword',passwordController.forgotpassword);



module.exports = router;