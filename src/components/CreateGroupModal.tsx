import { Flex } from '@chakra-ui/react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import Text from 'components/Text';
import { Modal } from 'components/Modal';
import Button from 'components/Button';
import InputField from 'components/InputField';

import useToast from 'hooks/useToast';

import CreateGroupWithParticipantMutationDef from 'graphql/CreateGroupWithParticipantMutation';

import type { ModalProps } from '@chakra-ui/react';
import type {
  CreateGroupWithParticipantMutation,
  CreateGroupWithParticipantMutation$data,
} from '__generated__/CreateGroupWithParticipantMutation.graphql';

export type Props = {
  isOpen: ModalProps['isOpen'];
  onClose: ModalProps['onClose'];
  setChosenGroupName: (groupName: string) => void;
  chosenGroupName: string;
  chosenAssignmentGroup: {
    assignmentTitle: string;
    assignmentId: string;
  } | null;
  courseId: string;
};

const CreateGroupModal = (props: Props) => {
  const {
    chosenGroupName,
    setChosenGroupName,
    chosenAssignmentGroup,
    isOpen,
    onClose,
    courseId,
  } = props;

  const toast = useToast();
  const navigate = useNavigate();

  const [commitCreateGroupWithParticipant] =
    useMutation<CreateGroupWithParticipantMutation>(
      CreateGroupWithParticipantMutationDef
    );

  const handleGroupChangeSubmit = () => {
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
              description: `Error al intentar crear el grupo: ${errors?.at(0)?.message}`,
              status: 'error',
            });
          }
        },
      });
    }
  };

  return (
    <Modal
      headerText={`Crear grupo - Trabajo Práctico: ${chosenAssignmentGroup?.assignmentTitle}`}
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
        <Text>Ingresá el nombre del grupo: </Text>
        <InputField
          id={'name'}
          value={chosenGroupName || ''}
          onChange={event => setChosenGroupName(event.target.value)}
          placeholder={'Nombre'}
          type={'text'}
        />
      </Flex>
    </Modal>
  );
};

export default CreateGroupModal;
