import React from 'react';
import {
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';

type Props = ChakraModalProps & {
  children?: JSX.Element;
  headerText: string;
};

export const Modal = ({ headerText, children, ...rest }: Props) => {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </ChakraModal>
  );
};
