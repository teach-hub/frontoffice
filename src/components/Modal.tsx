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
  footerChildren?: JSX.Element;
};

export const Modal = ({ headerText, children, footerChildren, ...rest }: Props) => {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footerChildren ? <ModalFooter>{footerChildren}</ModalFooter> : <ModalFooter />}
      </ModalContent>
    </ChakraModal>
  );
};
