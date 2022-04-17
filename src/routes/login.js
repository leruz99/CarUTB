const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
router.get('/logout', LoginController.logout);
router.get('/add',  LoginController.addCar);
router.post('/add', LoginController.addStore);
router.get('/mycar', LoginController.mycarlist);
router.get('/add', LoginController.addYourCar);


module.exports = router;