// Pure function: no React, no side effects, easy to unit test.
// Checks run in a fixed order: drive status -> branch -> CGPA.
export function checkEligibility(student, drive) {
  if (drive.status !== 'active') {
    return {
      eligible: false,
      code: 'DRIVE_CLOSED',
      reason: 'Drive is not open for applications',
    };
  }
  if (!drive.eligibleBranches.includes(student.branch)) {
    return { eligible: false, code: 'INELIGIBLE_BRANCH', reason: 'Branch not eligible' };
  }
  if (student.cgpa < drive.minCGPA) {
    return {
      eligible: false,
      code: 'INELIGIBLE_CGPA',
      reason: `CGPA below ${drive.minCGPA.toFixed(1)}`,
    };
  }
  return { eligible: true, code: null, reason: null };
}
