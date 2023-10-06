import type { ModalProps } from '@chakra-ui/react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import Text from 'components/Text';
import { Modal } from 'components/Modal';
import Button from 'components/Button';

import useToast from 'hooks/useToast';

import CreateGroupWithParticipantMutationDef from 'graphql/CreateGroupWithParticipantMutation';
import type {
  CreateGroupWithParticipantMutation,
  CreateGroupWithParticipantMutation$data,
} from '__generated__/CreateGroupWithParticipantMutation.graphql';
import React, { useState } from 'react';
import Spinner from 'components/Spinner';

export type Props = {
  isOpen: ModalProps['isOpen'];
  onClose: ModalProps['onClose'];
  chosenAssignmentGroup: {
    assignmentTitle: string;
    assignmentId: string;
  } | null;
  courseId: string;
};

const CreateGroupModal = (props: Props) => {
  const { chosenAssignmentGroup, isOpen, onClose, courseId } = props;

  const toast = useToast();
  const navigate = useNavigate();

  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [commitCreateGroupWithParticipant] =
    useMutation<CreateGroupWithParticipantMutation>(
      CreateGroupWithParticipantMutationDef
    );

  const handleGroupChangeSubmit = () => {
    setShowSpinner(true);
    commitCreateGroupWithParticipant({
      variables: {
        courseId,
        assignmentId: chosenAssignmentGroup?.assignmentId ?? '',
      },
      onCompleted: (response: CreateGroupWithParticipantMutation$data, errors) => {
        setShowSpinner(false);
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
  };

  return (
    <>
      <Spinner
        isOpen={showSpinner}
        onClose={() => {
          setShowSpinner(false);
        }}
      />
      <Modal
        headerText={`Trabajo Práctico: ${chosenAssignmentGroup?.assignmentTitle}`}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        footerChildren={
          <>
            <Button onClick={onClose} variant={'ghost'}>
              {'Cancelar'}
            </Button>
            <Button onClick={handleGroupChangeSubmit}>{'Crear'}</Button>
          </>
        }
      >
        <Text fontSize={'md'}>
          Vas a generar un nuevo grupo con un nombre autogenerado y comenzarás a formar
          parte de él
        </Text>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
