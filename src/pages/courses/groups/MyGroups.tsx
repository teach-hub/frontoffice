import { useUserContext } from 'hooks/useUserCourseContext';
import Navigation from 'components/Navigation';
import { Suspense, useState } from 'react';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { AlertIcon, CheckCircleIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Text from 'components/Text';
import Box from 'components/Box';
import Table from 'components/Table';
import UserCourseGroupsQueryDef from 'graphql/UserCourseGroupsQuery';
import CreateGroupWithParticipantMutationDef from 'graphql/CreateGroupWithParticipantMutation';
import { UserCourseGroupsQuery } from '__generated__/UserCourseGroupsQuery.graphql';
import Menu from 'components/Menu';
import { Nullable } from 'types';
import InputField from 'components/InputField';
import Button from 'components/Button';
import {
  CreateGroupWithParticipantMutation,
  CreateGroupWithParticipantMutation$data,
} from '__generated__/CreateGroupWithParticipantMutation.graphql';
import useToast from 'hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { theme } from 'theme';

interface AssignmentGroupData {
  assignmentId: string;
  assignmentTitle: string;
  groupName: string | null | undefined;
  groupParticipants: string[] | null | undefined;
}

enum AssignmentGroupAction {
  Create,
  Join,
  None,
}

const MyGroupsPage = ({ courseId }: { courseId: string }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [assignmentGroupAction, setAssignmentGroupAction] = useState(
    AssignmentGroupAction.None
  );
  const [chosenAssignmentGroup, setChosenAssignmentGroup] =
    useState<Nullable<AssignmentGroupData>>(null);

  /*
   * Save the chosen group name, for when the user
   * creates a group
   * */
  const [chosenGroupName, setChosenGroupName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userCourseGroupsQuery = useLazyLoadQuery<UserCourseGroupsQuery>(
    UserCourseGroupsQueryDef,
    {
      courseId,
    }
  );
  const assignments = userCourseGroupsQuery.viewer?.course?.assignments ?? [];
  const viewerGroups = userCourseGroupsQuery.viewer?.course?.viewerGroups ?? [];

  const groupsData: AssignmentGroupData[] = assignments
    .map(assignment => {
      const assignmentViewerGroup = viewerGroups.find(
        viewerGroup => viewerGroup.assignmentId === assignment.id
      );

      const participantsData = assignmentViewerGroup?.otherParticipants?.map(
        participant =>
          `${participant.name} ${participant.lastName} (${participant.file})${
            participant.notificationEmail ? ` - ${participant.notificationEmail}` : ''
          }`
      );

      /* TODO: TH-157 Filter assignments for group */
      return assignment.title
        ? {
            assignmentId: assignment.id,
            assignmentTitle: assignment.title,
            groupName: assignmentViewerGroup?.group?.name,
            groupParticipants: participantsData,
          }
        : undefined;
    })
    .filter(
      assignmentGroupData => assignmentGroupData !== undefined
    ) as AssignmentGroupData[];

  const GroupList = ({
    groupsData,
  }: {
    groupsData: AssignmentGroupData[];
  }): JSX.Element => {
    const emptyState = (
      <Box margin="90px" textAlign={'center'}>
        <Box margin="30px">
          <AlertIcon size={70} />
        </Box>
        <Heading size="md">No pudimos encontrar ningún trabajo práctico grupal</Heading>
        <Text>
          Es necesario que existan trabajos prácticos grupales para poder gestionar tus
          grupos
        </Text>
      </Box>
    );

    const handleCreateGroup = (assignmentGroupData: AssignmentGroupData) => {
      setAssignmentGroupAction(AssignmentGroupAction.Create);
      setChosenAssignmentGroup(assignmentGroupData);
      onOpen();
    };

    const handleJoinGroup = () => {
      console.log('handleJoinGroup');
    };

    return (
      <>
        <Table
          headers={['', 'Trabajo Práctico', 'Grupo', 'Integrantes', '']}
          rowOptions={groupsData.map(data => {
            return {
              content: [
                data.groupName ? (
                  <CheckCircleIcon size="medium" fill={theme.colors.teachHub.green} />
                ) : (
                  <AlertIcon size="medium" fill={theme.colors.teachHub.red} />
                ),
                <Text fontWeight={'bold'}>{data.assignmentTitle}</Text>,
                data.groupName || '-',
                <Stack>
                  {data.groupParticipants?.map(participant => (
                    <Text>{participant}</Text>
                  )) ?? '-'}
                </Stack>,
                <Menu
                  content={{
                    menuButton: <KebabHorizontalIcon />,
                    items: [
                      { content: 'Crear grupo', action: () => handleCreateGroup(data) },
                      { content: 'Unirme a grupo', action: handleJoinGroup },
                    ],
                  }}
                />,
              ],
            };
          })}
        />
        {!groupsData.length && emptyState}
      </>
    );
  };

  const [commitCreateGroupWithParticipant] =
    useMutation<CreateGroupWithParticipantMutation>(
      CreateGroupWithParticipantMutationDef
    );

  const handleGroupChangeSubmit = () => {
    if (assignmentGroupAction === AssignmentGroupAction.Create) {
      commitCreateGroupWithParticipant({
        variables: {
          groupName: chosenGroupName,
          courseId,
          assignmentId: chosenAssignmentGroup?.assignmentId ?? '',
        },
        onCompleted: (response: CreateGroupWithParticipantMutation$data, errors) => {
          const responseData = response.createGroupWithParticipant;
          const group = responseData?.group;
          if (!errors?.length && group) {
            setAssignmentGroupAction(AssignmentGroupAction.None);
            setChosenAssignmentGroup(null);
            onClose();
            navigate(0); // Reload page data
          } else {
            toast({
              title: 'Error',
              description: `Error al intentar crear el grupo: ${errors?.at(0)?.message}`,
              status: 'error',
            });
          }
        },
      });
    } else {
      /* TODO: TH-149 Join group */
      console.log('join');
    }
  };

  const handleGroupChangeCancel = () => {
    setChosenAssignmentGroup(null);
    setChosenGroupName('');
    onClose();
  };

  return (
    <PageDataContainer>
      <Heading size="lg" marginBottom={'30px'}>
        Mis grupos
      </Heading>
      <Box width={'100vw'}>
        <Text>
          En esta sección vas a poder gestionar tus grupos para los distintos trabajos
          prácticos.
        </Text>

        <Text>
          Para cada trabajo es necesario seleccionar el grupo del que vas a formar parte,
          pudiendo unirte a grupos o creando nuevos.
        </Text>
        <Text fontStyle={'italic'} marginTop={'20px'}>
          Los grupos creados en trabajos prácticos previos pueden volver a ser
          seleccionados en futuros trabajos.
        </Text>
      </Box>

      <Box padding="30px 0px">
        <GroupList groupsData={groupsData} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {assignmentGroupAction === AssignmentGroupAction.Create ? (
              <Text>
                Crear grupo - Trabajo Práctico: {chosenAssignmentGroup?.assignmentTitle}
              </Text>
            ) : (
              <Text>
                Unirse a grupo - Trabajo Práctico:{' '}
                {chosenAssignmentGroup?.assignmentTitle}
              </Text>
            )}
          </ModalHeader>
          <ModalBody>
            {assignmentGroupAction === AssignmentGroupAction.Create ? (
              <Flex direction={'column'} gap={'10px'}>
                <Text>Ingresá el nombre del grupo: </Text>
                <InputField
                  id={'name'}
                  value={chosenGroupName}
                  onChange={event => setChosenGroupName(event.target.value)}
                  placeholder={'Nombre'}
                  type={'text'}
                />
              </Flex>
            ) : (
              /* TODO: TH-149 Join group */
              <Text>Join group</Text>
            )}
          </ModalBody>
          <ModalFooter gap={'30px'}>
            <Button onClick={handleGroupChangeCancel} variant={'ghost'}>
              {'Cancelar'}
            </Button>
            <Button onClick={handleGroupChangeSubmit}>{'Guardar'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageDataContainer>
  );
};

const MyGroupsPageContainer = () => {
  const { courseId } = useUserContext();

  if (!courseId) {
    return null;
  }

  return <MyGroupsPage courseId={courseId} />;
};

export default () => {
  return (
    <Navigation>
      <Suspense fallback={'Cargando datos'}>
        <MyGroupsPageContainer />
      </Suspense>
    </Navigation>
  );
};
