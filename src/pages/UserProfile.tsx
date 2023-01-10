import { useState, ChangeEvent, Suspense } from 'react';
import { useRelayEnvironment, commitMutation, useLazyLoadQuery } from 'react-relay';

import { graphql } from 'babel-plugin-relay/macro';

import { FormControl, FormLabel, Stack } from '@chakra-ui/react';

import AvatarImage from '../components/AvatarImage';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Box from '../components/Box';
import Heading from '../components/Heading';

import type { UserProfileQuery, UserProfileQuery$data } from '../__generated__/UserProfileQuery.graphql';
import type { UserProfileMutation } from '../__generated__/UserProfileMutation.graphql';

const Query = graphql`
  query UserProfileQuery {
    viewer {
      userId
      name
      lastName
      githubId
      file
      notificationEmail
    }
  }
`;

const mutation = graphql`
  mutation UserProfileMutation(
    $id: ID!,
    $name: String,
    $lastName: String,
    $file: String,
    $githubId: String,
    $notificationEmail: String
  ) {
    updateUser(userId: $id, file: $file, name: $name, lastName: $lastName, githubId: $githubId, notificationEmail: $notificationEmail) {
      name
      lastName
      file
      githubId
      notificationEmail
    }
  }
`;

const CancelButton = (rest: any) => {
  return (
    <Button {...rest} bg="red.400" color="white" w="full" _hover={{ bg: 'red.500' }}>
      Cancelar
    </Button>
  );
}

const SubmitButton = (rest: any) => {
  return (
    <Button
      {...rest}
      bg={'blue.400'}
      color={'white'}
      w="full"
      _hover={{
        bg: 'blue.500',
      }}>
      Guardar
    </Button>
  )
};

type Props = {
  user: UserProfileQuery$data;
}

const UserProfilePage = ({ user }: Props): JSX.Element => {

  const [queryResult, setResult] = useState<UserProfileQuery$data['viewer'] | undefined>(user.viewer);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const relayEnv = useRelayEnvironment();

  const handleOnChangeField = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setResult(c => {
      if (!c) return c;

      return { ...c, [fieldName]: value };
    })
  }

  const handleSubmit = (e: MouseEvent) => {
    return commitMutation<UserProfileMutation>(
      relayEnv, {
        mutation,
        variables: {
          id: queryResult?.userId ?? '',
          name: queryResult?.name,
          lastName: queryResult?.lastName,
          githubId: queryResult?.githubId,
          file: queryResult?.file,
          notificationEmail: queryResult?.notificationEmail
        }
      }
    )
  }

  const handleCancel = (e: MouseEvent) => {
    setIsEditing(false);
  }

  return (
    <Box padding="20%" paddingTop="50px">
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        Perfil de {queryResult?.name}
      </Heading>
      <Box display="flex" flexDir="row">

        <AvatarImage onEdit={() => setIsEditing(true)} url="https://bit.ly/sage-adebayo" />

        <Box flex="1">
          <FormControl padding="10px" isRequired>
            <FormLabel>Nombre</FormLabel>
            <InputField
              isReadOnly={!isEditing}
              value={queryResult?.name ?? undefined}
              onChange={handleOnChangeField('name')}
              placeholder="Ernesto"
              type="text"
            />
          </FormControl>

          <FormControl padding="10px" isRequired>
            <FormLabel>Apellido</FormLabel>
            <InputField
              isReadOnly={!isEditing}
              value={queryResult?.lastName ?? undefined}
              onChange={handleOnChangeField('lastName')}
              placeholder="Perez"
              type="text"
            />
          </FormControl>

          <FormControl padding="10px" isRequired>
            <FormLabel>Padron</FormLabel>
            <InputField
              isReadOnly={!isEditing}
              value={queryResult?.file ?? undefined}
              onChange={handleOnChangeField('file')}
              placeholder="12345"
              type="number"
            />
          </FormControl>

          <FormControl padding="10px" isRequired>
            <FormLabel>Email (notificaciones)</FormLabel>
            <InputField
              isReadOnly={!isEditing}
              value={queryResult?.notificationEmail ?? undefined}
              onChange={handleOnChangeField('noticationsEmail')}
              placeholder="joseph@example.com"
              type="email"
            />
          </FormControl>

          <FormControl padding="10px" isRequired>
            <FormLabel>Usuario de Github</FormLabel>
            <InputField
              isReadOnly={!isEditing}
              value={queryResult?.githubId ?? undefined}
              onChange={handleOnChangeField('githubId')}
              placeholder="michalescott"
              type="text"
            />
          </FormControl>
        </Box>
      </Box>
      {isEditing &&
        <Stack padding="10px" spacing={6} direction={['column', 'row']}>
          <CancelButton onClick={handleCancel} />
          <SubmitButton onClick={handleSubmit} />
        </Stack>
      }
    </Box>
  )
}


const UserProfilePageContainer = () => {
  const data = useLazyLoadQuery<UserProfileQuery>(Query, {});

  return <UserProfilePage user={data} />;
};

export default () => {
  return (
    <Suspense fallback={<div> Loading... </div>}>
      <UserProfilePageContainer />
    </Suspense>
  );
}
