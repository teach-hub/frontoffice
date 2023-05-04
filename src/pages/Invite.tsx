import { useEffect } from 'react';
import { useMutation } from 'react-relay';
import { useNavigate, useLocation } from 'react-router-dom';

import UseInviteMutationDef from 'graphql/UseInviteMutation';
import {
  UseInviteMutation,
  UseInviteMutation$data,
} from '__generated__/UseInviteMutation.graphql';

const InvitePage = () => {
  const [commitUseInviteMutation] = useMutation<UseInviteMutation>(UseInviteMutationDef);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname.split('/')[2]);

  useEffect(() => {
    commitUseInviteMutation({
      variables: { inviteId: location.pathname.split('/')[2] },
      onCompleted: (response: UseInviteMutation$data) => {
        console.log('Response was', response);

        if (response.useInvite.courseId) {
          console.log(`Redirecting to /courses/${response.useInvite.courseId}`);

          navigate(`/courses/${response.useInvite.courseId}`);
        }
      },
    });
  });

  return <h1> Missing page </h1>;
};

export default InvitePage;
