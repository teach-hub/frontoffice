import { Flex } from '@chakra-ui/react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import { Modal } from 'components/Modal';
import Button from 'components/Button';
import Select from 'components/Select';

import useToast from 'hooks/useToast';

import JoinGroupMutationDef from 'graphql/JoinGroupMutation';

import type { ModalProps } from '@chakra-ui/react';
import type {
  JoinGroupMutation,
  JoinGroupMutation$data,
} from '__generated__/JoinGroupMutation.graphql';

export type Props = {
  isOpen: ModalProps['isOpen'];
  onClose: ModalProps['onClose'];
  setChosenGroupName: (groupName: string) => void;
  chosenGroupName: string;
  chosenAssignmentGroup: {
    assignmentTitle: string;
    assignmentId: string;
  } | null;
  availableGroups: {
    id: string;
    name: string | null;
    assignmentId: string;
  }[];
  courseId: string;
};

const JoinGroupModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    setChosenGroupName,
    chosenGroupName,
    chosenAssignmentGroup,
    availableGroups,
    courseId,
  } = props;

  const toast = useToast();
  const navigate = useNavigate();

  const [commitJoinGroup] = useMutation<JoinGroupMutation>(JoinGroupMutationDef);

  const handleGroupChangeSubmit = () => {
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
          groupId,
          courseId,
          assignmentId: chosenAssignmentGroup?.assignmentId ?? '',
        },
        onCompleted: ({ joinGroup: { group } }: JoinGroupMutation$data, errors) => {
          if (!errors?.length && group) {
            onClose();

            // TODO. FIXME > Hay formas mas faciles
            // de hacer esto, una de ellas es manipular la store directamente.
            navigate(0);
          } else {
            toast({
              title: 'Error',
              description: `Error al intentar unirse al grupo: ${errors?.at(0)?.message}`,
              status: 'error',
            });
          }
        },
      });
    }
  };

  return (
    <Modal
      headerText={`Unirse a grupo - Trabajo Práctico: ${chosenAssignmentGroup?.assignmentTitle}`}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      footerChildren={
        <>
          <Button onClick={onClose} variant={'ghost'}>
            {'Cancelar'}
          </Button>
          <Button onClick={handleGroupChangeSubmit}>{'Guardar'}</Button>
        </>
      }
    >
      <Flex direction={'column'} gap={'10px'}>
        <Select
          placeholder="Seleccioná un grupo"
          value={chosenGroupName || ''}
          onChange={event => setChosenGroupName(event.target.value)}
        >
          {availableGroups
            .filter(g => g.assignmentId === chosenAssignmentGroup?.assignmentId)
            .map(group => (
              <option value={group.name || ''} key={group.id}>
                {group.name}
              </option>
            ))}
        </Select>
      </Flex>
    </Modal>
  );
};

export default JoinGroupModal;
