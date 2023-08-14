import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { Icon } from '@chakra-ui/icons';

import CourseAssignmentsQueryDef from 'graphql/CourseAssignmentsQuery';

import { formatAsSimpleDateTime } from 'utils/dates';

import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';

import type { CourseAssignmentsQuery } from '__generated__/CourseAssignmentsQuery.graphql';
import { Flex, Stack } from '@chakra-ui/react';
import { PlusIcon } from '@primer/octicons-react';
import Table, { ClickableRowPropsConfiguration } from 'components/Table';
import Button from 'components/Button';
import Text from 'components/Text';

const AssignmentsPage = () => {
  const navigate = useNavigate();
  const courseContext = useUserContext();

  const data = useLazyLoadQuery<CourseAssignmentsQuery>(CourseAssignmentsQueryDef, {
    courseId: courseContext.courseId || '',
  });

  const assignments = data.viewer?.course?.assignments || [];

  return (
    <PageDataContainer>
      <Flex direction="row" gap={'20px'} align={'center'}>
        <Heading>{'Trabajos Prácticos'}</Heading>
        {courseContext.userHasPermission(Permission.CreateAssignment) && (
          <Button
            variant={'ghostBorder'}
            onClick={() => navigate(`create`)}
            width={'fit-content'}
          >
            <Flex align="center">
              <Icon as={PlusIcon} boxSize={6} marginRight={2} />
              <Text>Crear</Text>
            </Flex>
          </Button>
        )}
      </Flex>

      <Stack gap={'30px'} marginTop={'10px'}>
        <Table
          headers={['Título', 'Fecha límite entrega']}
          rowOptions={assignments.map(data => {
            return {
              rowProps: {
                ...ClickableRowPropsConfiguration,
                onClick: () => navigate(data.id),
              },
              content: [
                `${data.title}`,
                data.endDate ? formatAsSimpleDateTime(data.endDate) : '-',
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
