import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { drives } from '../data/mockDrives';

// Joins each application with its drive details.
export default function useApplications() {
  const { applications } = useApp();
  return useMemo(
    () =>
      applications
        .map((a) => ({ ...a, drive: drives.find((d) => d.id === a.driveId) }))
        .filter((a) => a.drive),
    [applications],
  );
}
