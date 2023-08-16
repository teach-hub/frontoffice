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
                <Flex>
                  <Tooltip label={'Ver entregas'}>
                    <Link
                      as={RRLink}
                      to={buildSubmissionLink(data.id)}
                      onClick={event => event.stopPropagation()} // Avoid row clic behaviour
                    >
                      <IconButton
                        variant={'ghost'}
                        aria-label="pull-request-link"
                        icon={<SubmissionIcon size="medium" />}
                      />
                    </Link>
                  </Tooltip>
                </Flex>,
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
