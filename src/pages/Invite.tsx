import { useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import UseInviteMutationDef from 'graphql/UseInviteMutation';
import {
  UseInviteMutation,
  UseInviteMutation$data,
} from '__generated__/UseInviteMutation.graphql';

const InvitePage = () => {
  const [commitUseInviteMutation] = useMutation<UseInviteMutation>(UseInviteMutationDef);

  const navigate = useNavigate();
  const { inviteId } = useParams();

  if (!inviteId) {
    return null;
  }

  const handleAcceptInvite = async () => {
    commitUseInviteMutation({
      variables: { inviteId },
      onCompleted: (response: UseInviteMutation$data) => {
        if (response.useInvite.courseId) {
          console.log(`Redirecting to /courses/${response.useInvite.courseId}`);

          navigate(`/courses/${response.useInvite.courseId}`);
        }
      },
    });
  };

  return (
    <>
      Te invitaron al curso
      <button onClick={handleAcceptInvite}> </button>
    </>
  );
};

export default InvitePage;
