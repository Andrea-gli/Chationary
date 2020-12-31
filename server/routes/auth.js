const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  return res.sendStatus(200);
});

router.post('/signin', userController.verifyUser, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;
