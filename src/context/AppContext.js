import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { student } from '../data/mockStudent';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [applications, setApplications] = useState(student.applications);

  const isApplied = useCallback(
    (driveId) => applications.some((a) => a.driveId === driveId),
    [applications],
  );

  const apply = useCallback((driveId) => {
    setApplications((prev) =>
      prev.some((a) => a.driveId === driveId)
        ? prev
        : [{ driveId, status: 'Applied' }, ...prev],
    );
  }, []);

  const value = useMemo(
    () => ({ student, applications, isApplied, apply }),
    [applications, isApplied, apply],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
