const express = require("express");
const router = express.Router();
const isAuth = require('../middleware/jwtAuth');

const userController = require("../controllers/user");
router.post('/user',userController.registerUser);
router.post('/login',userController.loginUser);
router.get('/users',isAuth,userController.getUsers);

module.exports = router;