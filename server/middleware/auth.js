const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { fail } = require('../utils/respond');

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return fail(res, 401, 'UNAUTHORIZED', 'Missing bearer token');
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return fail(res, 401, 'INVALID_TOKEN', 'Token is invalid or expired');
  }
};
