import { createContext, ReactNode, useContext, useState } from 'react';

type SubmissionContextType = {
  submissionIds: string[];
  setSubmissionIds: (ids: string[]) => void;
};

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export const useSubmissionContext = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissionContext must be used within a SubmissionProvider');
  }
  return context;
};

type SubmissionProviderProps = {
  children: ReactNode;
};

export const SubmissionProvider = ({ children }: SubmissionProviderProps) => {
  const [submissionIds, setSubmissionIds] = useState<string[]>([]);

  const contextValue: SubmissionContextType = {
    submissionIds,
    setSubmissionIds,
  };

  return (
    <SubmissionContext.Provider value={contextValue}>
      {children}
    </SubmissionContext.Provider>
  );
};
