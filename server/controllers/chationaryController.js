const db = require('../models/chationaryModels');
const { response } = require('../server');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const chationaryController = {};

// chationaryController.getUsers = (req, res, next) => {
//   const newQuery = `SELECT * FROM profiles`;

//   db.query(newQuery)
//     .then((data) => {
//       res.locals.users = data.rows;
//       return next();
//     })
//     .catch((err) => {
//       return next('could not complete query:' + err);
//     });
// };

function hashPassword(password) {
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
    if (hash) return hash;
  });
}

chationaryController.createUser = (req, res, next) => {
  const { username, passkey } = req.body;
  console.log('req.body-->', req.body);
  let hashedPass = hashPassword(passkey);
  const newProfile = [username, hashedPass];
  const newQuery = `INSERT INTO profiles (username, passkey)
    VALUES ($1, $2);`;

  db.query(newQuery, newProfile)
    .then((data) => {
      console.log(req.body);
      return next();
    })
    .catch((err) => {
      return next('unable to create user:' + err);
    });
};

module.exports = chationaryController;
