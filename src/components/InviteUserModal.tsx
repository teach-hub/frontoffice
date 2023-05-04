import { useState } from 'react';
import {
  useClipboard,
  Stack,
  Flex,
  Select,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  ModalContent,
  Modal,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import Button from 'components/Button';
import Text from 'components/Text';
import Input from 'components/InputField';

type Props = {
  onGenerateLink: (_: { roleId: string }) => Promise<string>;
  isOpen: ModalProps['isOpen'];
  onClose: ModalProps['onClose'];
  roles: { name: string; value: string }[];
};

export default ({ roles, isOpen, onClose, onGenerateLink }: Props) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('', 5000);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const _onGenerateLink = async () => {
    if (!selectedRole) {
      return;
    }
    const link = await onGenerateLink({ roleId: selectedRole });
    setValue(link);
  };

  const _onClose = () => {
    setValue('');
    return onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={_onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invitar nuevo usuario</ModalHeader>
        <ModalBody>
          <Stack spacing="20px">
            <Text>
              Selecciona el rol que debera tener el nuevo usuario. Una vez seleccionado
              clickea en "Generar link de invitacion"
            </Text>
            <Select
              onChange={v => setSelectedRole(v.target.value)}
              placeholder="Seleccionar rol"
            >
              {roles.map((role, i) => (
                <option key={i} value={role.value}>
                  {role.name}
                </option>
              ))}
            </Select>
            <Flex>
              {/* TOOD (Tomas): Mejores mensajes */}
              <Input
                placeholder="Todavia no generaste el link"
                isReadOnly
                value={value}
              />
              <Button isDisabled={hasCopied} onClick={onCopy} variant="outline">
                <CopyIcon />
              </Button>
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={_onGenerateLink}>Generar link</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
