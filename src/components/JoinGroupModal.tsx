import { Flex } from '@chakra-ui/react';

import { Modal } from 'components/Modal';
import Button from 'components/Button';
import Select from 'components/Select';

import type { ModalProps } from '@chakra-ui/react';

export type Props = {
  isOpen: ModalProps['isOpen'];
  onClose: ModalProps['onClose'];
  setChosenGroupName: (groupName: string) => void;
  chosenGroupName: string;
  chosenAssignmentGroup: {
    assignmentTitle: string;
    assignmentId: string;
  } | null;
  handleGroupChangeSubmit: () => void;
  availableGroups: {
    id: string;
    name: string | null;
    assignmentId: string;
  }[];
};

const JoinGroupModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    setChosenGroupName,
    chosenGroupName,
    chosenAssignmentGroup,
    handleGroupChangeSubmit,
    availableGroups,
  } = props;

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
