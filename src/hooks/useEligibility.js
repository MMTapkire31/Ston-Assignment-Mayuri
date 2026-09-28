import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { checkEligibility } from '../utils/eligibilityUtils';

// Returns a function: check(drive) -> { eligible, code, reason }
export default function useEligibility() {
  const { student } = useApp();
  return useMemo(() => (drive) => checkEligibility(student, drive), [student]);
}
