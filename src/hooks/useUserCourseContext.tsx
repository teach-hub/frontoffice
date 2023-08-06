import { createContext, Suspense, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useLazyLoadQuery } from 'react-relay';

import { Center, Spinner } from '@chakra-ui/react';

import CourseContextQuery from 'graphql/CourseContextQuery';

import type { CourseContextQuery as CourseContextQueryData } from '__generated__/CourseContextQuery.graphql';

export enum Permission {
  ViewHome = 'viewHome',
  EditSubject = 'editSubject',
  InviteUser = 'inviteUser',
  CreateAssignment = 'createAssignment',
  ManageOwnGroups = 'manageOwnGroups',
  SubmitAssignment = 'submitAssignment',
  EditAssignment = 'editAssignment',
  DeleteAssignment = 'deleteAssignment',
  SetOrganization = 'setOrganization',
  ViewSubmission = 'viewSubmission',
  CreateRepository = 'createRepository',
  AssignReviewer = 'assignReviewer',
  SetReview = 'setReview',
}

export type EmptyContext = {
  courseId: null;
  userPermissions: never[];
  userIsTeacher: null;
};

export type FetchedContext = {
  courseId: string;
  userPermissions: string[];
  userIsTeacher: boolean;
};

export type CourseContext = (EmptyContext | FetchedContext) & {
  userHasPermission: (p: Permission) => boolean;
};

const _noop = () => false;

// Valor usado solamente cuando no esta el provider (UserContext.Provider)
// https://legacy.reactjs.org/docs/context.html#reactcreatecontext
const defaultUserContext: CourseContext = {
  courseId: null,
  userIsTeacher: null,
  userPermissions: [],
  userHasPermission: _noop,
};

const _CourseContext = createContext<CourseContext>({ ...defaultUserContext });

const Provider = ({
  children,
  courseId,
}: {
  children: JSX.Element;
  courseId: string;
}) => {
  const courseContextData = useLazyLoadQuery<CourseContextQueryData>(CourseContextQuery, {
    courseId,
  });

  const viewerCourseContext = courseContextData.viewer?.course?.viewerRole;
  const viewerCoursePermissions = viewerCourseContext?.permissions?.filter(
    (p): p is string => !!p
  );

  const [courseContext] = useState<CourseContext>({
    courseId,
    userIsTeacher: viewerCourseContext?.isTeacher ?? false,
    userPermissions: viewerCoursePermissions ?? [],
    userHasPermission: (p: Permission) => {
      return (viewerCoursePermissions ?? []).includes(p);
    },
  });

  return (
    <_CourseContext.Provider value={courseContext}>{children}</_CourseContext.Provider>
  );
};

const LoadingContextFallback = () => {
  return (
    <Center margin="100px">
      <Spinner boxSize="50px" />
    </Center>
  );
};

const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const { courseId } = useParams();

  if (!courseId) {
    console.warn('Course ID not found, using default context');
    return <>{children}</>;
  }

  console.log(`Provider for course ${courseId} loaded!`);

  return (
    <Suspense fallback={<LoadingContextFallback />}>
      <Provider courseId={courseId}>{children}</Provider>
    </Suspense>
  );
};

const useUserContext = () => useContext<CourseContext>(_CourseContext);

export { ContextProvider, useUserContext };
