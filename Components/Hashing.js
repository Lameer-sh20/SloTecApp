const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function hashing(password) {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  return await bcrypt.hash(password, salt);
}

module.exports = {
  hashing: hashing,
};
