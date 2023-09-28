import React from 'react';
import { Box, Modal, ModalOverlay, Spinner } from '@chakra-ui/react';

const LoadingSpinner = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="9999" // Adjust the zIndex to ensure it's on top of everything
        backdropFilter="blur(5px)" // Add a blur effect to the background
      >
        <Spinner size="xl" color="blue.500" />
      </Box>
    </Modal>
  );
};

export default LoadingSpinner;
