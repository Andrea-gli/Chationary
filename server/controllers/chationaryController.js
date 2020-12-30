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
  const { username, password } = req.body;
  console.log('req.body-->', req.body);
  let hashedPass = hashPassword(password);
  console.log('hashedPass--->', hashedPass);
  const newProfile = [username, hashedPass];
  const newQuery = `INSERT INTO profiles (username, password)
    VALUES ($1, $2);`;

  db.query(newQuery, newProfile)
    .then((data) => {
      console.log('data===>', data);
      //console.log(req.body);
      return next();
    })
    .catch((err) => {
      return next('unable to create user:' + err);
    });
};

module.exports = chationaryController;
