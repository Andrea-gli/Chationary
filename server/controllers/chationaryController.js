const db = require('../models/chationaryModels');
const { response } = require('../server');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const chationaryController = {};

function hashPassword(password) {
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
    if (hash) return hash;
  });
}

chationaryController.createUser = (req, res, next) => {
  const hashedPass = hashPassword(req.body.password);
  const values = [req.body.username, hashedPass];
  //hash password

  const newQuery = `INSERT INTO profiles (username, passkey)
     VALUES ($1, $2);`;
  //   const { username, password } = req.body;
  //   console.log('req.body-->', req.body);
  //   let hashedPass = hashPassword(password);
  //   console.log('hashedPass--->', hashedPass);
  //   const newProfile = [username, hashedPass];
  //   const newQuery = `INSERT INTO profiles (username, password)
  //     VALUES ($1, $2);`;

  db.query(newQuery, values, (err, data) => {
    if (err) {
      console.log('errrrr=>', err);
      return next(err);
    }
    console.log('data--->', data);
    return next();
  });
};

module.exports = chationaryController;
