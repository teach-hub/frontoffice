import { Flex } from '@chakra-ui/react';

import Text from 'components/Text';
import { Modal } from 'components/Modal';
import Button from 'components/Button';
import InputField from 'components/InputField';

import type { ModalProps } from '@chakra-ui/react';

export type Props = {
  isOpen: ModalProps['isOpen'];
  onClose: ModalProps['onClose'];
  setChosenGroupName: (groupName: string) => void;
  chosenGroupName: string;
  chosenAssignmentGroup: {
    assignmentTitle: string;
  } | null;
  handleGroupChangeSubmit: () => void;
};

const CreateGroupModal = (props: Props) => {
  const {
    chosenGroupName,
    setChosenGroupName,
    chosenAssignmentGroup,
    handleGroupChangeSubmit,
    isOpen,
    onClose,
  } = props;

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
