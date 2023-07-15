import { useUserContext } from 'hooks/useUserCourseContext';
import Navigation from 'components/Navigation';
import { Suspense, useEffect, useState } from 'react';
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
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Text from 'components/Text';
import Box from 'components/Box';
import Table from 'components/Table';
import UserCourseGroupsQueryDef from 'graphql/UserCourseGroupsQuery';
import CreateGroupWithParticipantMutationDef from 'graphql/CreateGroupWithParticipantMutation';
import JoinGroupMutationDef from 'graphql/JoinGroupMutation';
import {
  UserCourseGroupsQuery,
  UserCourseGroupsQuery$data,
} from '__generated__/UserCourseGroupsQuery.graphql';
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
import {
  JoinGroupMutation,
  JoinGroupMutation$data,
} from '__generated__/JoinGroupMutation.graphql';

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

type ViewerCourseData = NonNullable<
  NonNullable<UserCourseGroupsQuery$data['viewer']>['course']
>;

const mapToAssignmentGroupData = (
  assignments: NonNullable<ViewerCourseData['assignments']>,
  viewerGroups: NonNullable<ViewerCourseData['viewerGroups']>
) => {
  return assignments
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
};

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
   * creates or joins a group
   * */
  const [chosenGroupName, setChosenGroupName] = useState<Nullable<string>>(null);

  const userCourseGroupsQuery = useLazyLoadQuery<UserCourseGroupsQuery>(
    UserCourseGroupsQueryDef,
    {
      courseId,
    }
  );
  const assignments = userCourseGroupsQuery.viewer?.course?.assignments ?? [];
  const viewerGroups = userCourseGroupsQuery.viewer?.course?.viewerGroups ?? [];
  const availableGroups = [...(userCourseGroupsQuery.viewer?.course?.groups ?? [])].sort(
    (a, b) => a?.name?.localeCompare(b?.name || '') || 0
  ); // Sort groups by ascending name

  const groupsData: AssignmentGroupData[] = mapToAssignmentGroupData(
    assignments,
    viewerGroups
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    /* When modal closes reset manage group information */
    if (!isOpen) {
      setAssignmentGroupAction(AssignmentGroupAction.None);
      setChosenAssignmentGroup(null);
      setChosenGroupName(null);
    }
  }, [isOpen]);

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

    const handleAssignmentGroup = (
      assignmentGroupData: AssignmentGroupData,
      action: AssignmentGroupAction
    ) => {
      setAssignmentGroupAction(action);
      setChosenAssignmentGroup(assignmentGroupData);
      onOpen();
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
                <Text>{data.groupName || '-'}</Text>,
                <Stack>
                  {data.groupParticipants?.map(participant => (
                    <Text>{participant}</Text>
                  )) ?? '-'}
                </Stack>,
                <Menu
                  content={{
                    menuButton: <KebabHorizontalIcon />,
                    items: [
                      {
                        content: 'Crear grupo',
                        action: () =>
                          handleAssignmentGroup(data, AssignmentGroupAction.Create),
                      },
                      {
                        content: 'Unirme a grupo',
                        action: () =>
                          handleAssignmentGroup(data, AssignmentGroupAction.Join),
                      },
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

  const [commitJoinGroup] = useMutation<JoinGroupMutation>(JoinGroupMutationDef);

  const handleGroupChangeSubmit = () => {
    if (assignmentGroupAction === AssignmentGroupAction.Create) {
      if (!chosenGroupName) {
        toast({
          title: 'Error',
          description: 'El nombre del grupo no puede estar vacío',
          status: 'error',
        });
      } else {
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
              onClose();
              navigate(0); // Reload page data
            } else {
              toast({
                title: 'Error',
                description: `Error al intentar crear el grupo: ${
                  errors?.at(0)?.message
                }`,
                status: 'error',
              });
            }
          },
        });
      }
    } else {
      if (!chosenGroupName) {
        toast({
          title: 'Error',
          description: 'Se debe seleccionar un grupo',
          status: 'error',
        });
        return;
      }

      /* Get the group id by its name */
      const groupId = availableGroups.find(group => group?.name === chosenGroupName)?.id;

      if (!groupId) {
        toast({
          title: 'Error',
          description: `Error al intentar unirse al grupo, intente de nuevo`,
          status: 'error',
        });
      } else {
        commitJoinGroup({
          variables: {
            groupId: groupId,
            courseId,
            assignmentId: chosenAssignmentGroup?.assignmentId ?? '',
          },
          onCompleted: (response: JoinGroupMutation$data, errors) => {
            const responseData = response.joinGroup;
            const group = responseData?.group;
            if (!errors?.length && group) {
              onClose();
              navigate(0); // Reload page data
            } else {
              toast({
                title: 'Error',
                description: `Error al intentar unirse al grupo: ${
                  errors?.at(0)?.message
                }`,
                status: 'error',
              });
            }
          },
        });
      }
    }
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
                  value={chosenGroupName || ''}
                  onChange={event => setChosenGroupName(event.target.value)}
                  placeholder={'Nombre'}
                  type={'text'}
                />
              </Flex>
            ) : (
              <Flex direction={'column'} gap={'10px'}>
                <Select
                  placeholder="Seleccioná un grupo"
                  value={chosenGroupName || ''}
                  onChange={event => setChosenGroupName(event.target.value)}
                >
                  {availableGroups.map(group => (
                    <option value={group.name || ''} key={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter gap={'30px'}>
            <Button onClick={onClose} variant={'ghost'}>
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
