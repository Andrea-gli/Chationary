const db = require('../models/chationaryModels');
const { response } = require('../server');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const chationaryController = {};

chationaryController.getUsers = (req, res, next) => {
  const newQuery = `SELECT * FROM profiles`;

  db.query(newQuery)
    .then((data) => {
      res.locals.users = data.rows;
      return next();
    })
    .catch((err) => {
      return next('could not complete query:' + err);
    });
};

function hashPassword(password) {
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
    if (hash) return hash;
  });
}

chationaryController.createUser = (req, res, next) => {
  const { username, passkey, date_created, country, email } = req.body;
  let hashedPass = hashPassword(passkey);
  const newProfile = [username, hashedPass, date_created, country, email];
  const newQuery = `INSERT INTO profiles (username, passkey, date_created, country, email)
    VALUES ($1, $2, $3, $4, $5);`;

  db.query(newQuery, newProfile)
    .then((data) => {
      console.log(req.body);
      return next();
    })
    .catch((err) => {
      return next('unable to create user:' + err);
    });
};

chationaryController.getChatrooms = (req, res, next) => {
  const newQuery = `SELECT * FROM chatrooms`;

  db.query(newQuery)
    .then((data) => {
      res.locals.chatrooms = data.rows;
      return next();
    })
    .catch((err) => {
      return next('could not complete query:' + err);
    });
};

chationaryController.createChatroom = (req, res, next) => {
  const { chatroom_name, language } = req.body;
  const newRoom = [chatroom_name, language];
  const newQuery = `INSERT INTO chatrooms (chatroom_name, language)
    VALUES ($1, $2)`;

  db.query(newQuery, newRoom)
    .then((data) => {
      console.log(req.body);
      return next();
    })
    .catch((err) => {
      return next('unable to add room:' + err);
    });
};

module.exports = chationaryController;
