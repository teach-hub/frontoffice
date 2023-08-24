import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';
import Navigation from 'components/Navigation';
import React, { Suspense, useEffect, useState } from 'react';
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
import { Flex, SimpleGrid, Stack, useDisclosure } from '@chakra-ui/react';
import Text from 'components/Text';
import { theme } from 'theme';
import {
  AssignmentGroupsData,
  getFirstAssignmentGroupsUsersData,
  mapToUserName,
  mapToUserNames,
} from 'app/groups';
import IconButton from 'components/IconButton';
import CreateIcon from 'icons/CreateIcon';
import Tooltip from 'components/Tooltip';
import AddPersonIcon from 'icons/AddPersonIcon';
import { Modal } from 'components/Modal';
import { Checkbox } from 'components/Checkbox';
import { Nullable } from 'types';
import CheckboxGroup from 'components/CheckboxGroup';
import Button from 'components/Button';

const GroupsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const courseId = courseContext.courseId;
  const { assignmentId } = useParams();

  const {
    isOpen: isOpenAddUsersModal,
    onOpen: onOpenAddUsersModal,
    onClose: onCloseAddUsersModal,
  } = useDisclosure();

  const {
    isOpen: isCreateGroupModal,
    onOpen: onCreateGroupModal,
    onClose: onCloseCreateGroupModal,
  } = useDisclosure();

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

  const studentsWithoutGroupNames = mapToUserNames(
    assignmentGroupsData.studentsWithoutGroup
  );
  const missingGroupTableContent =
    studentsWithoutGroupNames.length !== 0
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
                {studentsWithoutGroupNames.map((userName: string) => (
                  <Text>{userName}</Text>
                ))}
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

  const [selectedGroupId, setSelectedGroupId] = useState<Nullable<string>>(null);
  const [selectedUserIdsToAdd, setSelectedUsersIdsToAdd] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpenAddUsersModal) {
      setSelectedGroupId(null);
      setSelectedUsersIdsToAdd([]);
    }
  }, [isOpenAddUsersModal]);

  const handleAddUsersCheckboxGroupChange = (checkedValues: string[]) => {
    setSelectedUsersIdsToAdd(checkedValues);
  };

  const handleAddUsersToGroup = () => {
    /* TODO: TH-153 add mutation */
    console.log(selectedGroupId);
    console.log(selectedUserIdsToAdd);
    onCloseAddUsersModal();
  };

  return (
    <PageDataContainer>
      <Heading>{`Grupos | ${selectedAssignment?.title}`}</Heading>{' '}
      <Stack paddingY={'10px'}>
        <Table
          tableHeight={'75vh'}
          headers={['Grupo', 'Alumnos', '']}
          rowOptions={assignmentGroupsData.groupUsersData
            .map(({ groupId, groupName, users }) => {
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
                            onClick={() => {
                              setSelectedGroupId(groupId);
                              onOpenAddUsersModal();
                            }}
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
      <AddUsersToGroupModal
        assignmentGroupsData={assignmentGroupsData}
        onClose={onCloseAddUsersModal}
        isOpen={isOpenAddUsersModal}
        handleAddUsersToGroup={handleAddUsersToGroup}
        handleAddUsersCheckboxGroupChange={handleAddUsersCheckboxGroupChange}
        selectedGroupId={selectedGroupId}
      />
    </PageDataContainer>
  );
};

const AddUsersToGroupModal = ({
  assignmentGroupsData,
  isOpen,
  onClose,
  selectedGroupId,
  handleAddUsersToGroup,
  handleAddUsersCheckboxGroupChange,
}: {
  assignmentGroupsData: AssignmentGroupsData;
  onClose: () => void;
  isOpen: boolean;
  handleAddUsersToGroup: () => void;
  handleAddUsersCheckboxGroupChange: (values: string[]) => void;
  selectedGroupId: Nullable<string>;
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    headerText={
      `${
        assignmentGroupsData.groupUsersData.find(
          groupData => groupData.groupId === selectedGroupId
        )?.groupName
      }` + ': Agregar usuarios'
    }
    footerChildren={
      <Flex direction={'row'} gap={'30px'}>
        <Button onClick={onClose} variant={'ghost'}>
          {'Cancelar'}
        </Button>
        <Button onClick={handleAddUsersToGroup}>{'Guardar'}</Button>
      </Flex>
    }
    contentProps={{
      minWidth: 'fit-content',
    }}
  >
    <Stack direction={'column'} width={'100%'}>
      <CheckboxGroup onChange={handleAddUsersCheckboxGroupChange}>
        <SimpleGrid columns={2} spacingX={10} spacingY={4} alignItems="center">
          {assignmentGroupsData.studentsWithoutGroup.map(student => (
            <Checkbox id={student.id} value={student.id}>
              {mapToUserName(student)}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </Stack>
  </Modal>
);

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
