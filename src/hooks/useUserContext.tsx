import { ReactNode, createContext, useContext, useState } from 'react';

type Context = {
  courseId: string | null
  setCourseId(_: string): void
  clearCourseId(): void
}

const noop = () => {};

// Valor usado solamente cuando no esta el provider (UserContext.Provider)
// https://legacy.reactjs.org/docs/context.html#reactcreatecontext
const defaultContext: Context = {
  courseId: null,
  setCourseId: noop,
  clearCourseId: noop,
};

const UserContext = createContext(defaultContext);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [courseId, setCourseId] = useState(defaultContext.courseId);

  const contextValue: Context = {
    setCourseId,
    clearCourseId: () => setCourseId(null),
    courseId,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext);

export { ContextProvider, useUserContext }
