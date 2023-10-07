import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import UseInviteMutationDef from 'graphql/UseInviteMutation';
import {
  UseInviteMutation,
  UseInviteMutation$data,
} from '__generated__/UseInviteMutation.graphql';
import Button from 'components/Button';
import { Image, Stack } from '@chakra-ui/react';
import Heading from 'components/Heading';
import logo from 'assets/logo_wo_text.png';
import { InviteCourseInfoQuery } from '__generated__/InviteCourseInfoQuery.graphql';
import InviteCourseInfoQueryDef from 'graphql/InviteCourseInfoQuery';
import Text from 'components/Text';
import useToast from 'hooks/useToast';
import { buildCourseRoute } from 'routes';

const InvitePage = () => {
  const [commitUseInviteMutation] = useMutation<UseInviteMutation>(UseInviteMutationDef);

  const toast = useToast();
  const navigate = useNavigate();
  const { inviteId } = useParams();

  const data = useLazyLoadQuery<InviteCourseInfoQuery>(InviteCourseInfoQueryDef, {
    inviteId: inviteId || '',
  });

  if (!inviteId) {
    return null;
  }

  const handleAcceptInvite = async () => {
    commitUseInviteMutation({
      variables: { inviteId },
      onCompleted: (response: UseInviteMutation$data, errors) => {
        if (errors?.length) {
          toast({
            title: 'Error al unirse al curso',
            description: 'La invitación no es válida o expiró',
            status: 'error',
          });
        } else if (response.useInvite?.courseId) {
          console.log(`Redirecting to /courses/${response.useInvite.courseId}`);

          navigate(buildCourseRoute(response.useInvite.courseId));
        }
      },
    });
  };

  const course = data?.courseOfInvite;
  const courseName = course?.name;
  const subjectName = course?.subject?.name;
  const subjectCode = course?.subject?.code;

  return (
    <Stack
      width={'100vw'}
      height={'100vh'}
      direction={'column'}
      align={'center'}
      justify={'center'}
      gap={'30px'}
    >
      <Image src={logo} width={'10vw'} />
      <Heading as="h1">Bienvenido a Teachhub!</Heading>

      <Text>
        Recibiste una invitación para unirte a{' '}
        <Text as="span" fontWeight="bold">
          {subjectName} ({subjectCode}) - {courseName}
        </Text>
      </Text>
      <Button onClick={handleAcceptInvite} width={'fit-content'}>
        Unirme al curso
      </Button>
    </Stack>
  );
};

export default InvitePage;
