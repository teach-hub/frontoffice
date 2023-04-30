import {
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  ModalContent,
  Modal,
} from '@chakra-ui/react';

type Props = ModalProps;

export default (props: Props) => {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Testing</ModalHeader>
        <ModalBody>Testing</ModalBody>
      </ModalContent>
    </Modal>
  );
};
