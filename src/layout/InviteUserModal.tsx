import { useFragment, useMutation } from 'react-relay';

import useToast from 'hooks/useToast';

import InviteUserModal, { Props as ModalProps } from 'components/InviteUserModal';
import GenerateInviteMutationDef from 'graphql/GenerateInviteMutation';
import AvailableRolesFragmentDef from 'graphql/AvailableRolesFragment';

import { GenerateInviteMutation } from '__generated__/GenerateInviteMutation.graphql';
import { AvailableRolesFragment$key } from '__generated__/AvailableRolesFragment.graphql';

type Props = {
  rootQueryRef: AvailableRolesFragment$key;
  isOpen: boolean;
  onClose: ModalProps['onClose'];
  courseId: string;
};

const InviteModal = ({ courseId, rootQueryRef, isOpen, onClose }: Props) => {
  const fragment = useFragment(AvailableRolesFragmentDef, rootQueryRef);
  const [commitGenerateInviteMutation] = useMutation<GenerateInviteMutation>(
    GenerateInviteMutationDef
  );
  const toast = useToast();

  const handleGenerateInviteLink = async ({
    roleId,
    expirationMinutes,
  }: {
    roleId: string;
    expirationMinutes?: number;
  }) =>
    new Promise<string>((resolve, reject) =>
      commitGenerateInviteMutation({
        variables: { courseId, roleId, expirationMinutes },
        onCompleted: (result, errors) => {
          if (errors?.length) {
            toast({
              title: 'Error',
              description: 'No se pudo generar link de invitacion',
              status: 'error',
            });
            return reject(null);
          }

          return resolve(`http://localhost:3000/invites/${result.generateInviteCode}`);
        },
      })
    );

  return (
    <>
      {fragment.availableRoles && (
        <InviteUserModal
          onGenerateLink={handleGenerateInviteLink}
          isOpen={isOpen}
          roles={fragment.availableRoles.map(role => {
            return { name: role.name || '', value: role.id };
          })}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default InviteModal;
