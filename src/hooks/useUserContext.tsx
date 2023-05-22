import {
  Suspense,
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useState,
} from 'react';
import { useParams, Outlet } from 'react-router';
import { useLazyLoadQuery } from 'react-relay';

import CourseContextQuery from 'graphql/CourseContextQuery';

import type { CourseContextQuery as CourseContextQueryData } from '__generated__/CourseContextQuery.graphql';

type CourseContext =
  | {
      userPermissions: string[];
      userIsTeacher: boolean;
    }
  | {
      userPermissions: never[];
      userIsTeacher: null;
    };

// Valor usado solamente cuando no esta el provider (UserContext.Provider)
// https://legacy.reactjs.org/docs/context.html#reactcreatecontext
const defaultUserContext: CourseContext = {
  userIsTeacher: null,
  userPermissions: [],
};

const CourseContext = createContext<CourseContext>({ ...defaultUserContext });

const Provider = ({ courseId }: { courseId: string }) => {
  const courseContextData = useLazyLoadQuery<CourseContextQueryData>(CourseContextQuery, {
    courseId,
  });

  const viewerCourseContext = courseContextData.viewer?.findCourse?.viewerRole;
  const viewerCoursePermissions = viewerCourseContext?.permissions?.filter(
    (p): p is string => !!p
  );

  const [courseContext] = useState<CourseContext>({
    userIsTeacher: viewerCourseContext?.isTeacher ?? false,
    userPermissions: viewerCoursePermissions ?? [],
  });

  return <Outlet context={courseContext} />;
};

const ContextProvider = () => {
  const { courseId } = useParams();

  if (!courseId) {
    console.error('Failed to load course context, course ID not found');
    return <></>;
  }

  console.log(`Provider for course ${courseId} loaded!`);

  return (
    <Suspense fallback={<h1> Loading context ...</h1>}>
      <Provider courseId={courseId} />
    </Suspense>
  );
};

const useUserContext = () => useContext(CourseContext);

export { ContextProvider, useUserContext };
