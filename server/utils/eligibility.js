// Same rules as src/utils/eligibilityUtils.js, with API-style messages.
function checkEligibility(student, drive) {
  if (drive.status !== 'active') {
    return {
      eligible: false,
      code: 'DRIVE_CLOSED',
      message: 'This drive is not open for applications',
    };
  }
  if (!drive.eligibleBranches.includes(student.branch)) {
    return {
      eligible: false,
      code: 'INELIGIBLE_BRANCH',
      message: 'Your branch is not eligible for this drive',
    };
  }
  if (student.cgpa < drive.minCGPA) {
    return {
      eligible: false,
      code: 'INELIGIBLE_CGPA',
      message: 'Your CGPA does not meet the minimum requirement for this drive',
    };
  }
  return { eligible: true, code: null, message: 'You are eligible for this drive' };
}

module.exports = { checkEligibility };
