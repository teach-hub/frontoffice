import { useState } from 'react';
import { Flex, ModalProps, Select, Stack, useClipboard } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import Button from 'components/Button';
import Input from 'components/InputField';
import { Modal } from 'components/Modal';
import { FormControl } from 'components/FormControl';
import IconButton from 'components/IconButton';

export type Props = {
  onGenerateLink: (_: { roleId: string; expirationMinutes?: number }) => Promise<string>;
  isOpen: ModalProps['isOpen'];
  onClose: ModalProps['onClose'];
  roles: { name: string; value: string }[];
};

export default ({ roles, isOpen, onClose, onGenerateLink }: Props) => {
  const { onCopy, value, setValue } = useClipboard('', 5000);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const DEFAULT_EXPIRE_MINUTES = 60;
  const [expirationMinutes, setExpirationMinutes] =
    useState<number>(DEFAULT_EXPIRE_MINUTES);

  const _onGenerateLink = async () => {
    if (!selectedRole) {
      return;
    }
    const link = await onGenerateLink({ roleId: selectedRole, expirationMinutes });
    setValue(link);
  };

  const _onClose = () => {
    setValue('');
    return onClose();
  };

  const EXPIRATION_MINUTES_OPTIONS = [
    { name: '15 minutos', value: 15 },
    { name: '30 minutos', value: 15 },
    { name: '1 hora', value: 60 },
    { name: '1 dia', value: 60 * 24 },
    { name: '1 semana', value: 60 * 24 * 7 },
    { name: '2 semanas', value: 2 * 60 * 24 * 7 },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={_onClose}
      headerText={'Generar link para invitar usuarios al curso'}
      footerChildren={
        <Flex direction={'row'} gap={'30px'}>
          <Button onClick={_onGenerateLink} isDisabled={!selectedRole}>
            Generar link
          </Button>
        </Flex>
      }
    >
      <Stack gap="50px">
        <Stack gap={'10px'}>
          <FormControl
            label={'Rol'}
            helperText={'Rol que tendrán quienes ingresen al curso con el link'}
          >
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
          </FormControl>
          <FormControl
            label={'Tiempo de expiración'}
            helperText={'Tiempo en cuanto debe expirar el link'}
          >
            <Select
              onChange={v => setExpirationMinutes(Number(v.target.value))}
              placeholder="Sin expiración"
            >
              {EXPIRATION_MINUTES_OPTIONS.map((expirationData, i) => (
                <option key={i} value={expirationData.value}>
                  {expirationData.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <FormControl
          label={'Link de invitación'}
          helperText={
            'Copia y compartí este link para que otros usuarios puedan ingresar al curso'
          }
        >
          <Flex>
            <Input
              placeholder="Todavia no generaste el link"
              isReadOnly
              value={value}
              fontSize={'16px'}
            />
            <IconButton
              aria-label={'copy-link'}
              isDisabled={!value}
              onClick={onCopy}
              variant="outline"
              icon={<CopyIcon />}
            />
          </Flex>
        </FormControl>
      </Stack>
    </Modal>
  );
};
