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
import { FormControl } from 'components/FormControl';
import InputField from 'components/InputField';

const GroupsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const courseId = courseContext.courseId;
  const { assignmentId } = useParams();

  const {
    isOpen: isOpenAddUsersModal,
    onOpen: onOpenAddUsersModal,
    onClose: onCloseAddUsersModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCreateGroupModal,
    onOpen: onOpenCreateGroupModal,
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
                  <Text key={userName}>{userName}</Text>
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
                      onClick={() => {
                        onOpenCreateGroupModal();
                      }}
                    />
                  </span>
                </Tooltip>
              </Stack>,
            ],
          },
        ]
      : [];

  const [selectedGroupId, setSelectedGroupId] = useState<Nullable<string>>(null);
  const [selectedUserIds, setSelectedUsersIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpenAddUsersModal) {
      setSelectedGroupId(null);
      setSelectedUsersIds([]);
    }
  }, [isOpenAddUsersModal]);

  const handleCheckedUsersChange = (checkedValues: string[]) => {
    setSelectedUsersIds(checkedValues);
  };

  const handleAddUsersToGroup = () => {
    /* TODO: TH-153 add mutation */
    console.log(selectedGroupId);
    console.log(selectedUserIds);
    onCloseAddUsersModal();
  };

  const handleCreateGroup = (groupName: string) => {
    /* TODO: TH-153 add mutation */
    console.log(groupName);
    console.log(selectedUserIds);
    onCloseCreateGroupModal();
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
                      <Text key={userData}>{userData}</Text>
                    ))}
                  </Stack>
                );

                return {
                  content: [
                    <Text key={groupId}>{groupName}</Text>,
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
        handleSubmitAction={handleAddUsersToGroup}
        handleAddUsersCheckboxGroupChange={handleCheckedUsersChange}
        selectedGroupId={selectedGroupId}
      />
      <CreateGroupModal
        assignmentGroupsData={assignmentGroupsData}
        onClose={onCloseCreateGroupModal}
        isOpen={isOpenCreateGroupModal}
        handleSubmitAction={({ groupName }) => handleCreateGroup(groupName)}
        handleAddUsersCheckboxGroupChange={handleCheckedUsersChange}
      />
    </PageDataContainer>
  );
};

const AddUsersToGroupModal = ({
  assignmentGroupsData,
  isOpen,
  onClose,
  selectedGroupId,
  handleSubmitAction,
  handleAddUsersCheckboxGroupChange,
}: {
  assignmentGroupsData: AssignmentGroupsData;
  onClose: () => void;
  isOpen: boolean;
  handleSubmitAction: () => void;
  handleAddUsersCheckboxGroupChange: (values: string[]) => void;
  selectedGroupId: Nullable<string>;
}) => (
  <ManageGroupModal
    isOpen={isOpen}
    onClose={onClose}
    headerText={
      `${
        assignmentGroupsData.groupUsersData.find(
          groupData => groupData.groupId === selectedGroupId
        )?.groupName
      }` + ': Seleccionar usuarios a agregar'
    }
    handleSubmitAction={handleSubmitAction}
  >
    <ModalStudentsCheckboxGroup
      assignmentGroupsData={assignmentGroupsData}
      handleAddUsersCheckboxGroupChange={handleAddUsersCheckboxGroupChange}
    />
  </ManageGroupModal>
);

const CreateGroupModal = ({
  assignmentGroupsData,
  isOpen,
  onClose,
  handleSubmitAction,
  handleAddUsersCheckboxGroupChange,
}: {
  assignmentGroupsData: AssignmentGroupsData;
  onClose: () => void;
  isOpen: boolean;
  handleSubmitAction: ({ groupName }: { groupName: string }) => void;
  handleAddUsersCheckboxGroupChange: (values: string[]) => void;
}) => {
  const [groupName, setGroupName] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setGroupName('');
    }
  }, [isOpen]);

  return (
    <ManageGroupModal
      isOpen={isOpen}
      onClose={onClose}
      headerText={'Indicar nombre del grupo y seleccionar integrantes'}
      handleSubmitAction={() => {
        handleSubmitAction({ groupName });
      }}
    >
      <Stack direction={'column'}>
        <FormControl
          label={''}
          isInvalid={!groupName}
          errorMessage={'Nombre obligatorio'}
        >
          <InputField
            id={'groupName'}
            value={groupName}
            onChange={event => setGroupName(event.target.value)}
            type={'text'}
          />
        </FormControl>
        <ModalStudentsCheckboxGroup
          assignmentGroupsData={assignmentGroupsData}
          handleAddUsersCheckboxGroupChange={handleAddUsersCheckboxGroupChange}
        />
      </Stack>
    </ManageGroupModal>
  );
};

const ManageGroupModal = ({
  isOpen,
  onClose,
  headerText,
  handleSubmitAction,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  headerText: string;
  handleSubmitAction: () => void;
  children: JSX.Element;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      headerText={headerText}
      footerChildren={
        <Flex direction={'row'} gap={'30px'}>
          <Button onClick={onClose} variant={'ghost'}>
            {'Cancelar'}
          </Button>
          <Button onClick={handleSubmitAction}>{'Guardar'}</Button>
        </Flex>
      }
      contentProps={{
        minWidth: 'fit-content',
      }}
    >
      {children}
    </Modal>
  );
};

const ModalStudentsCheckboxGroup = ({
  assignmentGroupsData,
  handleAddUsersCheckboxGroupChange,
}: {
  assignmentGroupsData: AssignmentGroupsData;
  handleAddUsersCheckboxGroupChange: (values: string[]) => void;
}) => {
  return (
    <CheckboxGroup onChange={handleAddUsersCheckboxGroupChange}>
      <SimpleGrid columns={2} spacingX={10} spacingY={4} alignItems="center">
        {assignmentGroupsData.studentsWithoutGroup.map(student => (
          <Checkbox key={student.id} id={student.id} value={student.id}>
            {mapToUserName(student)}
          </Checkbox>
        ))}
      </SimpleGrid>
    </CheckboxGroup>
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