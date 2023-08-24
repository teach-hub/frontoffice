import React from 'react';
import {
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalContentProps as ChakraModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';

type Props = ChakraModalProps & {
  children?: JSX.Element;
  headerText: string;
  footerChildren?: JSX.Element;
  contentProps?: ChakraModalContentProps;
};

export const Modal = ({
  headerText,
  children,
  contentProps,
  footerChildren,
  ...rest
}: Props) => {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay />
      <ModalContent {...contentProps}>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footerChildren ? <ModalFooter>{footerChildren}</ModalFooter> : <ModalFooter />}
      </ModalContent>
    </ChakraModal>
  );
};
