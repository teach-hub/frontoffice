import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';
import Navigation from 'components/Navigation';
import React, { Suspense } from 'react';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import {
  AssignmentGroupsAndUsersQuery,
  AssignmentGroupsAndUsersQuery$data,
} from '__generated__/AssignmentGroupsAndUsersQuery.graphql';
import AssignmentGroupsAndUsersQueryDef from 'graphql/AssignmentGroupsAndUsersQuery';
import Table from 'components/Table';
import { Stack } from '@chakra-ui/react';
import Text from 'components/Text';
import { theme } from 'theme';
import { getFirstAssignmentGroupsUsersData, mapToUserNames } from 'app/groups';
import IconButton from 'components/IconButton';
import CreateIcon from 'icons/CreateIcon';
import Tooltip from 'components/Tooltip';
import AddPersonIcon from 'icons/AddPersonIcon';

const GroupsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const courseId = courseContext.courseId;
  const { assignmentId } = useParams();

  const data: AssignmentGroupsAndUsersQuery$data =
    useLazyLoadQuery<AssignmentGroupsAndUsersQuery>(AssignmentGroupsAndUsersQueryDef, {
      courseId: courseId || '',
      assignmentId: assignmentId || '',
    });

  const course = data.viewer?.course;
  const selectedAssignment = course?.assignments[0]; // Expect only one assignment

  const assignmentGroupsData = getFirstAssignmentGroupsUsersData({
    groupAndUsersData: data,
  });

  const missingGroupTableContent =
    assignmentGroupsData.studentsNamesWithoutGroup.length !== 0
      ? [
          {
            content: [
              <Text
                fontWeight={'bold'}
                fontStyle={'italic'}
                color={theme.colors.teachHub.red}
              >
                Sin grupo
              </Text>,
              <Stack>
                {assignmentGroupsData.studentsNamesWithoutGroup.map(
                  (userName: string) => (
                    <Text>{userName}</Text>
                  )
                )}
              </Stack>,
              <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                <Tooltip label={'Crear nuevo grupo'}>
                  {/* Wrap icon in span due to not using forwardRef */}
                  <span>
                    <IconButton
                      variant={'ghost'}
                      aria-label={'create-group'}
                      icon={<CreateIcon size="medium" />}
                      onClick={() => console.log('Create group')}
                    />
                  </span>
                </Tooltip>
              </Stack>,
            ],
          },
        ]
      : [];

  return (
    <PageDataContainer>
      <Heading>{`Grupos | ${selectedAssignment?.title}`}</Heading>{' '}
      <Stack paddingY={'10px'}>
        <Table
          tableHeight={'75vh'}
          headers={['Grupo', 'Alumnos', '']}
          rowOptions={assignmentGroupsData.groupUsersData
            .map(({ groupName, users }) => {
              {
                /* Create stack to view better spaced */
                const usersRowData = (
                  <Stack>
                    {mapToUserNames(users).map((userData: string) => (
                      <Text>{userData}</Text>
                    ))}
                  </Stack>
                );

                return {
                  content: [
                    <Text>{groupName}</Text>,
                    usersRowData,
                    <Stack
                      direction={'row'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Tooltip label={'Agregar alumnos'}>
                        {/* Wrap icon in span due to not using forwardRef */}
                        <span>
                          <IconButton
                            variant={'ghost'}
                            aria-label={'add-users-to-group'}
                            icon={<AddPersonIcon size="medium" />}
                            onClick={() => console.log('Edit group')}
                          />
                        </span>
                      </Tooltip>
                    </Stack>,
                  ],
                };
              }
            })
            .concat(missingGroupTableContent)}
        />
      </Stack>
    </PageDataContainer>
  );
};

const GroupsPageContainer = () => {
  const courseContext = useUserContext();

  if (!courseContext.courseId) {
    return null;
  }

  return <GroupsPage courseContext={courseContext} />;
};

export default () => {
  return (
    <Navigation>
      <Suspense>
        <GroupsPageContainer />
      </Suspense>
    </Navigation>
  );
};
