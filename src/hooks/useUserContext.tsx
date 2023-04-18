import { ReactNode, createContext, useContext, useState } from 'react';

// todo: meter el user en el context probablemente no sea necesario
type CourseContext = {
  courseId: string | null;
  setCourseId(_: string): void;
  clearCourseId(): void;
};

type UserContext = {
  user: string | null;
  setUser(_: string): void;
  clearUser(): void;
};

const noop = () => {};

// Valor usado solamente cuando no esta el provider (UserContext.Provider)
// https://legacy.reactjs.org/docs/context.html#reactcreatecontext
const defaultCourseContext: CourseContext = {
  courseId: null,
  setCourseId: noop,
  clearCourseId: noop,
};

const defaultUserContext: UserContext = {
  user: null,
  setUser: noop,
  clearUser: noop,
};

const UserContext = createContext({
  course: defaultCourseContext,
  user: defaultUserContext,
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(defaultCourseContext.courseId);
  const [courseId, setCourseId] = useState(defaultCourseContext.courseId);

  const courseContextValue: CourseContext = {
    setCourseId,
    clearCourseId: () => setCourseId(null),
    courseId,
  };

  const userContextValue: UserContext = {
    setUser,
    clearUser: () => setUser(null),
    user,
  };

  return (
    <UserContext.Provider value={{ course: courseContextValue, user: userContextValue }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { ContextProvider, useUserContext };
