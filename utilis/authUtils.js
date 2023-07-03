const jwt = require('jsonwebtoken');
const config = require('../config');

// Generate JSON Web Token (JWT)
const generateToken = (userId) => {
  const payload = {
    user: userId,
  };

  return jwt.sign(payload, config.secret_key, { expiresIn: '1h' });
};

// Verify JWT
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.secret_key);
    return decoded.user;
  } catch (error) {
    return null; // Token verification failed
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
