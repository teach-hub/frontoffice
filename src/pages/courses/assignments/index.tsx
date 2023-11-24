import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import CourseAssignmentsQueryDef from 'graphql/CourseAssignmentsQuery';

import { formatAsSimpleDateTime } from 'utils/dates';

import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';

import type { CourseAssignmentsQuery } from '__generated__/CourseAssignmentsQuery.graphql';
import { Flex, Stack } from '@chakra-ui/react';
import Table, { ClickableRowPropsConfiguration } from 'components/Table';
import Tooltip from 'components/Tooltip';
import IconButton from 'components/IconButton';
import SubmissionIcon from 'icons/SubmissionIcon';
import CreateIcon from 'icons/CreateIcon';
import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { buildAssignmentUrlFilter } from 'queries';
import CreateRepositoryIcon from 'icons/CreateRepositoryIcon';
import GroupIcon from 'icons/GroupIcon';
import useToast, { showWarningToast } from 'hooks/useToast';
import RRLink from 'components/RRLink';
import { buildAddAssignmentRoute, buildAssignmentRoute } from 'routes';

const AssignmentsPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const courseContext = useUserContext();

  const data = useLazyLoadQuery<CourseAssignmentsQuery>(CourseAssignmentsQueryDef, {
    courseId: courseContext.courseId || '',
    includeViewerSubmissions: !courseContext.userIsTeacher, // If viewer is student, include own submissions
  });

  const assignments = data.viewer?.course?.assignments || [];
  const isTeacher = courseContext.userIsTeacher === true;

  const buildSubmissionLink = ({
    assignmentId,
    viewerSubmissionId,
  }: {
    assignmentId?: string;
    viewerSubmissionId?: string;
  }) => {
    const SUBMISSION_BASE = `../submissions`;

    if (!assignmentId && !viewerSubmissionId) return SUBMISSION_BASE; // Go to all submissions

    return viewerSubmissionId
      ? `${SUBMISSION_BASE}/${viewerSubmissionId}` // Go to viewer submission
      : assignmentId
      ? `${SUBMISSION_BASE}?${buildAssignmentUrlFilter(assignmentId)}` // Go to assignment submissions
      : '#'; // Do nothing
  };

  const buildCreateRepositoryLink = (
    assignmentId: string,
    isGroupAssignment: boolean
  ) => {
    return assignmentId + '/new-repo' + (isGroupAssignment ? '/groups' : '/students');
  };

  const buildAssignmentGroupsLink = (assignmentId: string) => {
    return assignmentId + '/groups';
  };

  return (
    <PageDataContainer>
      <Flex direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Flex direction="row" gap={'20px'} align={'center'}>
          <Heading>{'Trabajos Prácticos'}</Heading>
          {courseContext.userHasPermission(Permission.CreateAssignment) && (
            <ButtonWithIcon
              variant={'ghostBorder'}
              onClick={() =>
                courseContext.courseId &&
                navigate(buildAddAssignmentRoute(courseContext.courseId))
              }
              text={'Crear'}
              icon={CreateIcon}
            />
          )}
        </Flex>
        {/* Only show all submissions to teachers*/}
        {isTeacher && (
          <ButtonWithIcon
            onClick={() => navigate(buildSubmissionLink({}))}
            text={'Ver todas las entregas'}
            icon={SubmissionIcon}
          />
        )}
      </Flex>

      <Stack gap={'30px'} marginTop={'10px'}>
        <Table
          headers={['Título', 'Fecha límite entrega', '']}
          rowOptions={assignments.map(data => {
            const isStudentAndMissingSubmissions = !isTeacher && !data.viewerSubmission;
            return {
              rowProps: {
                ...ClickableRowPropsConfiguration,
                onClick: () =>
                  courseContext.courseId &&
                  navigate(buildAssignmentRoute(courseContext.courseId, data.id)), // Navigate to assignment
              },
              content: [
                `${data.title}`,
                data.endDate ? formatAsSimpleDateTime(data.endDate) : '-',
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  {courseContext.userHasPermission(Permission.ManageGroups) &&
                    data.isGroup && (
                      <Tooltip label={'Ver grupos'}>
                        <RRLink
                          to={buildAssignmentGroupsLink(data.id)}
                          onClick={event => event.stopPropagation()} // Avoid row click behaviour
                        >
                          <IconButton
                            variant={'ghost'}
                            aria-label="view-groups"
                            icon={<GroupIcon />}
                          />
                        </RRLink>
                      </Tooltip>
                    )}
                  <Tooltip label={isTeacher ? 'Ver entregas' : 'Ver entrega'}>
                    <RRLink
                      to={buildSubmissionLink({
                        assignmentId: data.id,
                        viewerSubmissionId: data.viewerSubmission?.id,
                      })}
                      onClick={event => event.stopPropagation()} // Avoid row click behaviour
                      disabled={isStudentAndMissingSubmissions}
                    >
                      <IconButton
                        variant={'ghost'}
                        aria-label="view-submissions"
                        icon={<SubmissionIcon />}
                        isDisabled={isStudentAndMissingSubmissions}
                        onClick={() => {
                          if (isStudentAndMissingSubmissions)
                            showWarningToast({
                              toast,
                              title: 'No existe entrega asociada',
                              description:
                                'Para acceder al detalle primero se debe realizar la entrega',
                            });
                        }}
                      />
                    </RRLink>
                  </Tooltip>
                  {courseContext.userHasPermission(Permission.CreateRepository) && (
                    <Tooltip label={'Crear repositorios'}>
                      <RRLink
                        to={buildCreateRepositoryLink(data.id, !!data.isGroup)}
                        onClick={event => event.stopPropagation()} // Avoid row click behaviour
                      >
                        <IconButton
                          variant={'ghost'}
                          aria-label="create-repo-link"
                          icon={<CreateRepositoryIcon />}
                        />
                      </RRLink>
                    </Tooltip>
                  )}
                </Stack>,
              ],
            };
          })}
        />
      </Stack>
    </PageDataContainer>
  );
};

export default () => {
  return (
    <Navigation>
      <Suspense>
        <AssignmentsPage />
      </Suspense>
    </Navigation>
  );
};
