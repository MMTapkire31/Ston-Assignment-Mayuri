const express = require('express');
const drives = require('../data/drives.json');
const students = require('../data/students.json');
const { ok } = require('../utils/respond');

const router = express.Router();

router.get('/me', (req, res) => {
  const { password: _omit, ...student } = students.find((s) => s.id === req.user.id);
  return ok(res, student, 'Profile fetched successfully');
});

router.get('/me/applications', (req, res) => {
  const student = students.find((s) => s.id === req.user.id);
  const data = student.applications.map((a) => ({
    ...a,
    drive: drives.find((d) => d.id === a.driveId),
  }));
  return ok(res, data, 'Applications fetched successfully');
});

module.exports = router;
