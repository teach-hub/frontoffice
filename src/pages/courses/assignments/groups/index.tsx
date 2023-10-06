import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';
import Navigation from 'components/Navigation';
import { Suspense, useEffect, useState } from 'react';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useMutation } from 'react-relay';
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
import { CreateGroupWithParticipantsMutation } from '__generated__/CreateGroupWithParticipantsMutation.graphql';
import CreateGroupWithParticipantsMutationDef from 'graphql/CreateGroupWithParticipantsMutation';
import { AddParticipantsToGroupMutation } from '__generated__/AddParticipantsToGroupMutation.graphql';
import AddParticipantsToGroupMutationDef from 'graphql/AddParticipantsToGroupMutation';
import useToast from 'hooks/useToast';

const GroupsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const courseId = courseContext.courseId;
  const { assignmentId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

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
  const missingGroupTableContent = studentsWithoutGroupNames.length
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
                <IconButton
                  variant={'ghost'}
                  aria-label={'create-group'}
                  icon={<CreateIcon size="medium" />}
                  onClick={() => {
                    onOpenCreateGroupModal();
                  }}
                />
              </Tooltip>
            </Stack>,
          ],
        },
      ]
    : [];

  const [selectedGroupId, setSelectedGroupId] = useState<Nullable<string>>(null);
  const [selectedUserRoleIds, setSelectedUserRoleIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpenAddUsersModal) {
      setSelectedGroupId(null);
      setSelectedUserRoleIds([]);
    }
  }, [isOpenAddUsersModal]);

  const handleCheckedUsersChange = (checkedValues: string[]) => {
    setSelectedUserRoleIds(checkedValues);
  };

  const [commitCreateGroupWithParticipants] =
    useMutation<CreateGroupWithParticipantsMutation>(
      CreateGroupWithParticipantsMutationDef
    );

  const [commitAddParticipantsToGroup] = useMutation<AddParticipantsToGroupMutation>(
    AddParticipantsToGroupMutationDef
  );

  const handleAddUsersToGroup = () => {
    commitAddParticipantsToGroup({
      variables: {
        courseId,
        assignmentId: assignmentId || '',
        groupId: selectedGroupId || '',
        participantUserRoleIds: selectedUserRoleIds,
      },
      onCompleted: (_, errors) => {
        if (!errors?.length) {
          toast({
            title: 'Alumnos agregados!',
            status: 'info',
          });
          onCloseAddUsersModal();
          navigate(0); // Reload page data
        } else {
          console.log({ errors });
          toast({
            title: 'Error',
            description: `Error al intentar unirse a grupo: ${errors?.at(0)?.message}`,
            status: 'error',
          });
        }
      },
    });
  };

  const handleCreateGroup = () => {
    commitCreateGroupWithParticipants({
      variables: {
        assignmentId: assignmentId || '',
        courseId,
        participantUserRoleIds: selectedUserRoleIds,
      },
      onCompleted: (_, errors) => {
        if (!errors?.length) {
          toast({
            title: 'Grupo creado!',
            status: 'info',
          });
          onCloseCreateGroupModal();
        } else {
          console.log({ errors });
          toast({
            title: 'Error',
            description: `Error al intentar crear grupo: ${errors?.at(0)?.message}`,
            status: 'error',
          });
        }
      },
    });
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
                        <IconButton
                          variant={'ghost'}
                          aria-label={'add-users-to-group'}
                          icon={<AddPersonIcon size="medium" />}
                          onClick={() => {
                            setSelectedGroupId(groupId);
                            onOpenAddUsersModal();
                          }}
                        />
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
        submitEnabled={selectedUserRoleIds.length > 0}
      />
      <CreateGroupModal
        assignmentGroupsData={assignmentGroupsData}
        onClose={onCloseCreateGroupModal}
        isOpen={isOpenCreateGroupModal}
        handleSubmitAction={handleCreateGroup}
        handleAddUsersCheckboxGroupChange={handleCheckedUsersChange}
        submitEnabled={selectedUserRoleIds.length > 0}
      />
    </PageDataContainer>
  );
};

const AddUsersToGroupModal = ({
  assignmentGroupsData,
  isOpen,
  submitEnabled,
  onClose,
  selectedGroupId,
  handleSubmitAction,
  handleAddUsersCheckboxGroupChange,
}: {
  assignmentGroupsData: AssignmentGroupsData;
  onClose: () => void;
  isOpen: boolean;
  submitEnabled: boolean;
  handleSubmitAction: () => void;
  handleAddUsersCheckboxGroupChange: (values: string[]) => void;
  selectedGroupId: Nullable<string>;
}) => (
  <ManageGroupModal
    isOpen={isOpen}
    onClose={onClose}
    submitEnabled={submitEnabled}
    headerText={
      assignmentGroupsData.groupUsersData.find(
        groupData => groupData.groupId === selectedGroupId
      )?.groupName + ': Seleccionar usuarios a agregar'
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
  submitEnabled,
  onClose,
  handleSubmitAction,
  handleAddUsersCheckboxGroupChange,
}: {
  assignmentGroupsData: AssignmentGroupsData;
  onClose: () => void;
  isOpen: boolean;
  submitEnabled: boolean;
  handleSubmitAction: () => void;
  handleAddUsersCheckboxGroupChange: (values: string[]) => void;
}) => {
  return (
    <ManageGroupModal
      isOpen={isOpen}
      onClose={onClose}
      submitEnabled={submitEnabled}
      headerText={'Selecciona los integrantes del nuevo grupo'}
      handleSubmitAction={handleSubmitAction}
    >
      <Stack direction={'column'}>
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
  submitEnabled,
  children,
}: {
  isOpen: boolean;
  submitEnabled: boolean;
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
          <Button onClick={handleSubmitAction} isDisabled={!submitEnabled}>
            {'Guardar'}
          </Button>{' '}
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
          <Checkbox
            key={student.userRoleId}
            id={student.userRoleId}
            value={student.userRoleId}
          >
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
