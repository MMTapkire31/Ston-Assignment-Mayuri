import { checkEligibility } from '../src/utils/eligibilityUtils';

const student = { branch: 'CSE', cgpa: 7.4 };
const drive = { status: 'active', minCGPA: 6.5, eligibleBranches: ['CSE', 'IT'] };

describe('checkEligibility', () => {
  test('eligible when branch and CGPA match', () => {
    expect(checkEligibility(student, drive)).toEqual({
      eligible: true,
      code: null,
      reason: null,
    });
  });

  test('eligible when CGPA equals the minimum', () => {
    expect(checkEligibility({ ...student, cgpa: 6.5 }, drive).eligible).toBe(true);
  });

  test('ineligible when CGPA is below minimum', () => {
    const result = checkEligibility(student, { ...drive, minCGPA: 8.0 });
    expect(result).toMatchObject({
      eligible: false,
      code: 'INELIGIBLE_CGPA',
      reason: 'CGPA below 8.0',
    });
  });

  test('ineligible when branch is not listed', () => {
    const result = checkEligibility(student, { ...drive, eligibleBranches: ['ME'] });
    expect(result).toMatchObject({ eligible: false, code: 'INELIGIBLE_BRANCH' });
  });

  test('ineligible when the drive is not active', () => {
    const result = checkEligibility(student, { ...drive, status: 'completed' });
    expect(result.code).toBe('DRIVE_CLOSED');
  });
});
