import React, { Suspense } from 'react';
import { Link as RRLink, useNavigate } from 'react-router-dom';
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
import Link from 'components/Link';
import IconButton from 'components/IconButton';
import SubmissionIcon from 'icons/SubmissionIcon';
import CreateIcon from 'icons/CreateIcon';
import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { buildAssignmentUrlFilter } from 'queries';
import CreateRepositoryIcon from 'icons/CreateRepositoryIcon';
import GroupIcon from 'icons/GroupIcon';

const AssignmentsPage = () => {
  const navigate = useNavigate();
  const courseContext = useUserContext();

  const data = useLazyLoadQuery<CourseAssignmentsQuery>(CourseAssignmentsQueryDef, {
    courseId: courseContext.courseId || '',
  });

  const assignments = data.viewer?.course?.assignments || [];

  const buildSubmissionLink = (assignmentId?: string) => {
    return (
      `../submissions` +
      (assignmentId ? `?${buildAssignmentUrlFilter(assignmentId)}` : '')
    );
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
              onClick={() => navigate(`create`)}
              text={'Crear'}
              icon={CreateIcon}
            />
          )}
        </Flex>
        <ButtonWithIcon
          onClick={() => navigate(buildSubmissionLink())}
          text={'Ver todas las entregas'}
          icon={SubmissionIcon}
        />
      </Flex>

      <Stack gap={'30px'} marginTop={'10px'}>
        <Table
          headers={['Título', 'Fecha límite entrega', '']}
          rowOptions={assignments.map(data => {
            return {
              rowProps: {
                ...ClickableRowPropsConfiguration,
                onClick: () => navigate(data.id), // Navigate to assignment
              },
              content: [
                `${data.title}`,
                data.endDate ? formatAsSimpleDateTime(data.endDate) : '-',
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  {courseContext.userHasPermission(Permission.ViewGroups) &&
                    data.isGroup && (
                      <Tooltip label={'Ver grupos'}>
                        <Link
                          as={RRLink}
                          to={buildAssignmentGroupsLink(data.id)}
                          onClick={event => event.stopPropagation()} // Avoid row click behaviour
                        >
                          <IconButton
                            variant={'ghost'}
                            aria-label="view-groups"
                            icon={<GroupIcon />}
                          />
                        </Link>
                      </Tooltip>
                    )}
                  <Tooltip label={'Ver entregas'}>
                    <Link
                      as={RRLink}
                      to={buildSubmissionLink(data.id)}
                      onClick={event => event.stopPropagation()} // Avoid row click behaviour
                    >
                      <IconButton
                        variant={'ghost'}
                        aria-label="view-submissions"
                        icon={<SubmissionIcon />}
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip label={'Crear repositorios'}>
                    <Link
                      as={RRLink}
                      to={buildCreateRepositoryLink(data.id, !!data.isGroup)}
                      onClick={event => event.stopPropagation()} // Avoid row click behaviour
                    >
                      <IconButton
                        variant={'ghost'}
                        aria-label="create-repo-link"
                        icon={<CreateRepositoryIcon />}
                      />
                    </Link>
                  </Tooltip>
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
