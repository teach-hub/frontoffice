import { Stack, useDisclosure } from '@chakra-ui/react';
import { sortBy } from 'lodash';
import { Suspense, useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { AlertIcon, CheckCircleIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import { theme } from 'theme';

import { useUserContext } from 'hooks/useUserCourseContext';

import Navigation from 'components/Navigation';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import Text from 'components/Text';
import Box from 'components/Box';
import Table from 'components/Table';
import Menu from 'components/Menu';
import CreateGroupModal from 'components/CreateGroupModal';
import JoinGroupModal from 'components/JoinGroupModal';

import UserCourseGroupsQueryDef from 'graphql/UserCourseGroupsQuery';

import type {
  UserCourseGroupsQuery,
  UserCourseGroupsQuery$data,
} from '__generated__/UserCourseGroupsQuery.graphql';
import type { Nullable } from 'types';

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

const GroupListEmptyState = () => (
  <Box margin="90px" textAlign={'center'}>
    <Box margin="30px">
      <AlertIcon size={70} />
    </Box>
    <Heading size="md">No pudimos encontrar ningún trabajo práctico grupal</Heading>
    <Text>
      Es necesario que existan trabajos prácticos grupales para poder gestionar tus grupos
    </Text>
  </Box>
);

// Construe filas de la tabla en base a la informacion de los grupos.
const mapToAssignmentGroupData = (
  assignments: NonNullable<ViewerCourseData['assignments']>,
  viewerGroupParticipants: NonNullable<ViewerCourseData['viewerGroupParticipants']>
): AssignmentGroupData[] => {
  return assignments
    .filter(assignment => assignment.title && assignment.isGroup) // Keep only group assignments
    .map(assignment => {
      const assignmentViewerGroup = viewerGroupParticipants.find(
        ({ group: { assignmentId } }) => assignmentId === assignment.id
      );

      const participantsData = assignmentViewerGroup?.group.members?.map(
        ({ name, lastName, file, notificationEmail }) => {
          return `${name} ${lastName} (${file})${
            notificationEmail ? ` - ${notificationEmail}` : ''
          }`;
        }
      );

      return {
        assignmentId: assignment.id,
        assignmentTitle: assignment.title as string, // No es null, ya lo chequeamos arriba.
        groupName: assignmentViewerGroup?.group?.name,
        groupParticipants: participantsData,
      };
    });
};

const GroupList = ({
  groupsData,
  setAssignmentGroupAction,
  setChosenAssignmentGroup,
  onOpen,
}: {
  groupsData: AssignmentGroupData[];
  setAssignmentGroupAction: React.Dispatch<React.SetStateAction<AssignmentGroupAction>>;
  setChosenAssignmentGroup: React.Dispatch<
    React.SetStateAction<Nullable<AssignmentGroupData>>
  >;
  onOpen: () => void;
}): JSX.Element => {
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
                {data.groupParticipants?.map(participant => <Text>{participant}</Text>) ??
                  '-'}
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
      {!groupsData.length && <GroupListEmptyState />}
    </>
  );
};

const MyGroupsPage = ({ courseId }: { courseId: string }) => {
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

  const { course } = userCourseGroupsQuery?.viewer ?? {};

  const assignments = course?.assignments ?? [];
  const viewerGroupsParticipants = course?.viewerGroupParticipants ?? [];

  // Sort groups by ascending name
  const availableGroups = sortBy(course?.groups ?? [], 'name');

  const groupsData = mapToAssignmentGroupData(assignments, viewerGroupsParticipants);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    /* When modal closes reset manage group information */
    if (!isOpen) {
      setAssignmentGroupAction(AssignmentGroupAction.None);
      setChosenAssignmentGroup(null);
      setChosenGroupName(null);
    }
  }, [isOpen]);

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
        <GroupList
          onOpen={onOpen}
          setAssignmentGroupAction={setAssignmentGroupAction}
          setChosenAssignmentGroup={setChosenAssignmentGroup}
          groupsData={groupsData}
        />
      </Box>

      {assignmentGroupAction === AssignmentGroupAction.Create ? (
        <CreateGroupModal
          chosenAssignmentGroup={chosenAssignmentGroup}
          chosenGroupName={chosenGroupName || ''}
          setChosenGroupName={setChosenGroupName}
          onClose={onClose}
          isOpen={isOpen}
          courseId={courseId}
        />
      ) : (
        <JoinGroupModal
          availableGroups={availableGroups}
          chosenAssignmentGroup={chosenAssignmentGroup}
          chosenGroupName={chosenGroupName || ''}
          setChosenGroupName={setChosenGroupName}
          onClose={onClose}
          isOpen={isOpen}
          courseId={courseId}
        />
      )}
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
