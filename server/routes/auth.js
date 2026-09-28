const express = require('express');
const jwt = require('jsonwebtoken');
const students = require('../data/students.json');
const { JWT_SECRET } = require('../config');
const { ok, fail } = require('../utils/respond');

const router = express.Router();

router.post('/login', (req, res) => {
  const { rollNo, password } = req.body || {};
  if (!rollNo || !password) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Roll number and password are required');
  }
  const found = students.find(
    (s) =>
      s.rollNo.toLowerCase() === String(rollNo).toLowerCase() && s.password === password,
  );
  if (!found)
    return fail(res, 401, 'INVALID_CREDENTIALS', 'Invalid roll number or password');

  const token = jwt.sign({ id: found.id, rollNo: found.rollNo }, JWT_SECRET, {
    expiresIn: '1h',
  });
  const { password: _omit, ...student } = found;
  return ok(res, { token, student }, 'Login successful');
});

module.exports = router;
