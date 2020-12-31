const db = require('../models/chationaryModels');

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) res.sendStatus(401);

  const plainPass = password;
  bcrypt.hash(plainPass, SALT_WORK_FACTOR, (err, hash) => {
    console.log('hash-->', hash);

    const values = [
      req.body.username,
      hash,
      req.body.date_created,
      req.body.country,
      req.body.email,
    ];

    //hash password

    const newQuery = `INSERT INTO profiles (username, passkey, date_created, country, email)
     VALUES ($1, $2, $3, $4, $5);`;

    db.query(newQuery, values, (err, data) => {
      if (err) {
        console.log('errrrr=>', err);
        return next(err);
      }

      return next();
    });
  });
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log('user and pass---->', username, password);

  if (!username || !password) return res.sendStatus(401);

  const values = [username];
  const newQuery = 'SELECT * from profiles WHERE profiles.username = $1';
  try {
    const data = await db.query(newQuery, values);
    //console.log('data===>', data);
    const userInfo = data.rows[0];
    console.log('userInfo===>', userInfo);
    if (!userInfo) return res.sendStatus(401);

    const hashedPass = userInfo.passkey;
    console.log('hashedPass===>', hashedPass);
    const isMatch = await bcrypt.compare(password, hashedPass);
    console.log('match--->', isMatch);

    if (!isMatch) return res.sendStatus(401);
    return next();
  } catch (err) {
    return next({
      log: `userController: Unable to verify user data with verifyUser`,
      message: {
        err: `userController.verifyUser: ERROR: ${err}`,
      },
    });
  }
};

module.exports = userController;
