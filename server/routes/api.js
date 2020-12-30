const express = require('express');
const chationaryController = require('../controllers/chationaryController');
const authController = require('../controllers/authController');
const router = express.Router();

// router.get('/users', chationaryController.getUsers, (req, res) => {
//   console.log(res.locals.users);
//   res.status(200).json(res.locals.users);
// });

// router.get('/chatrooms', chationaryController.getChatrooms, (req, res) => {
//   console.log(res.locals.chatrooms);
//   res.status(200).json(res.locals.chatrooms);
// });
// router.post(
//   '/createchatroom',
//   chationaryController.createChatroom,
//   (req, res) => {
//     res.status(200).json({});
//   }
// );

router.post('/signup', chationaryController.createUser, (req, res) => {
  res.status(200).redirect('/home');
});

router.post(
  '/signin',
  authController.getPasskey,
  authController.verifyUser,
  (req, res) => {
    res.status(200).redirect('/home');
  }
  //routes to /home if valid, to / if not
);

module.exports = router;
