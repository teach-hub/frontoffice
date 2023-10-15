import { useEffect, useState } from 'react';

import { Flex, Select, Stack } from '@chakra-ui/react';

import Button from 'components/Button';
import { Modal } from 'components/Modal';
import { FormControl } from 'components/FormControl';
import { Checkbox } from 'components/Checkbox';

import { GRADES } from 'app/submissions';

import type { Nullable } from 'types';

type Props = {
  isSecondTimeReview: boolean;
  onSave: (_: { grade: Nullable<number>; revisionRequested: boolean }) => void;
  isOpen: boolean;
  onClose: () => void;
};

function ReviewModal({ onClose, isOpen, onSave, isSecondTimeReview }: Props) {
  const [grade, setGrade] = useState<Nullable<number>>(null);
  const [revisionRequested, setRevisionRequested] = useState<boolean>(false);

  useEffect(() => {
    setGrade(null);
    setRevisionRequested(false);
  }, [isOpen]);

  const handleSave = () => {
    onSave({ grade, revisionRequested });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      headerText={'Calificar'}
      closeOnOverlayClick={false}
      footerChildren={
        <Flex direction={'row'} gap={'30px'}>
          <Button onClick={onClose} variant={'ghost'}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </Flex>
      }
    >
      <Stack>
        <FormControl label={'Seleccionar nota'}>
          <Select
            placeholder="Selecciona una opción"
            value={grade ?? undefined}
            onChange={changes => setGrade(Number(changes.currentTarget.value))}
            isDisabled={revisionRequested}
          >
            {GRADES.map(grade => (
              <option value={grade} key={grade}>
                {grade}
              </option>
            ))}
          </Select>
        </FormControl>
        <Checkbox
          id={'revisionRequested'}
          isChecked={revisionRequested}
          isDisabled={isSecondTimeReview}
          onChange={() => {
            setRevisionRequested(!revisionRequested);
          }}
        >
          Requiere reentrega
        </Checkbox>
      </Stack>
    </Modal>
  );
}

export default ReviewModal;
