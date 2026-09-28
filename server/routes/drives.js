const express = require('express');
const drives = require('../data/drives.json');
const students = require('../data/students.json');
const { checkEligibility } = require('../utils/eligibility');
const { ok, fail } = require('../utils/respond');

const router = express.Router();
const findStudent = (id) => students.find((s) => s.id === id);

// Resolves :id once for every route below
router.param('id', (req, res, next, id) => {
  const drive = drives.find((d) => d.id === id);
  if (!drive) return fail(res, 404, 'DRIVE_NOT_FOUND', 'Drive not found');
  req.drive = drive;
  return next();
});

router.get('/', (req, res) =>
  ok(
    res,
    drives.filter((d) => d.status === 'active'),
    'Drives fetched successfully',
  ),
);

router.get('/:id', (req, res) => ok(res, req.drive, 'Drive fetched successfully'));

router.get('/:id/eligibility', (req, res) => {
  const result = checkEligibility(findStudent(req.user.id), req.drive);
  return ok(res, result, 'Eligibility checked successfully');
});

router.post('/:id/apply', (req, res) => {
  const student = findStudent(req.user.id);
  const result = checkEligibility(student, req.drive);
  if (!result.eligible) return fail(res, 403, result.code, result.message);
  if (student.applications.some((a) => a.driveId === req.drive.id)) {
    return fail(res, 409, 'ALREADY_APPLIED', 'You have already applied to this drive');
  }
  const application = { driveId: req.drive.id, status: 'Applied' };
  student.applications.push(application);
  return ok(res, application, 'Application submitted successfully', 201);
});

module.exports = router;
