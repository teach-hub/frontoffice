import { Formik } from 'formik';
import { useState, ChangeEvent, Suspense } from 'react';
import { useRelayEnvironment, commitMutation, useLazyLoadQuery } from 'react-relay';

import { graphql } from 'babel-plugin-relay/macro';

import { FormControl, FormErrorMessage, FormLabel, Stack, Spinner } from '@chakra-ui/react';

import AvatarImage from '../components/AvatarImage';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Box from '../components/Box';
import Heading from '../components/Heading';

import useToast from '../hooks/useToast';

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

  const toast = useToast();
  const [queryResult, setResult] = useState<UserProfileQuery$data['viewer'] | undefined>(user.viewer);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const relayEnv = useRelayEnvironment();

  const handleOnChangeField = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setResult(c => {
      if (!c) return c;

      return { ...c, [fieldName]: value };
    })
  }

  const handleSubmit = (e: MouseEvent) => {
    setShowSpinner(true);
    return commitMutation<UserProfileMutation>(
      relayEnv, {
        mutation,
        onCompleted(response, errors) {
          setShowSpinner(false);
          toast({
            title: "¡Usuario actualizado!",
            description: "El usuario fue actualizado",
            status: "success"
          })
        },
        onError(error) {
          toast({
            title: "Error",
            description: "El usuario no pudo ser actualizado",
            status: "error"
          })
        },
        variables: {
          id: queryResult?.userId ?? '',
          name: queryResult?.name,
          lastName: queryResult?.lastName,
          githubId: queryResult?.githubId,
          file: queryResult?.file,
          notificationEmail: queryResult?.notificationEmail
        }
      },
    );
  }

  const handleCancel = (e: MouseEvent) => {
    setIsEditing(false);
  }

  const validateForm = (values: any) => {
    console.log('Validating', values);
    const errors = {};

    if (!values.name) {
      // @ts-expect-error
      errors.name = 'Nombre no puede ser vacio';
    }

    return errors;
  }

  if (showSpinner) return <Spinner />;

  return (
    <Box padding="20%" paddingTop="50px">
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        Perfil de {queryResult?.name}
      </Heading>
      <Box display="flex" flexDir="row">

        <AvatarImage onEdit={() => setIsEditing(true)} url="https://bit.ly/sage-adebayo" />

        <Formik
          initialValues={{
            name: queryResult?.name,
            lastName: queryResult?.lastName,
            file: queryResult?.file,
            notificationsEmail: queryResult?.notificationEmail,
            githubId: queryResult?.githubId,
          }}
          validate={validateForm}
          onSubmit={() => {}}
        >
          {({ values, errors, touched, handleChange }) => {
            console.log('errors', errors)
            return (
              <Box flex="1">
                <Box padding="10px">
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Nombre</FormLabel>
                    <InputField
                      id="name"
                      isReadOnly={!isEditing}
                      value={values.name ?? undefined}
                      onChange={handleChange}
                      placeholder="Ernesto"
                      type="text"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box padding="10px">
                  <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel>Apellido</FormLabel>
                    <InputField
                      id="lastName"
                      isReadOnly={!isEditing}
                      value={values.lastName ?? undefined}
                      onChange={handleChange}
                      placeholder="Perez"
                      type="text"
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box padding="10px">
                  <FormControl isInvalid={!!errors.file}>
                    <FormLabel>Padron</FormLabel>
                    <InputField
                      id="file"
                      isReadOnly={!isEditing}
                      value={values.file ?? undefined}
                      onChange={handleChange}
                      placeholder="12345"
                      type="number"
                    />
                    <FormErrorMessage>{errors.file}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box padding="10px">
                  <FormControl isInvalid={!!errors.notificationsEmail}>
                    <FormLabel>Email (notificaciones)</FormLabel>
                    <InputField
                      id="notificationsEmail"
                      isReadOnly={!isEditing}
                      value={values.notificationsEmail ?? undefined}
                      onChange={handleChange}
                      placeholder="joseph@example.com"
                      type="email"
                    />
                    <FormErrorMessage>{errors.notificationsEmail}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box padding="10px">
                  <FormControl isInvalid={!!errors.githubId}>
                    <FormLabel>Usuario de Github</FormLabel>
                    <InputField
                      id="githubId"
                      isReadOnly={!isEditing}
                      value={values.githubId ?? undefined}
                      onChange={handleChange}
                      placeholder="michalescott"
                      type="text"
                    />
                    <FormErrorMessage>{errors.githubId}</FormErrorMessage>
                  </FormControl>
                </Box>

              </Box>
            )
          }}
        </Formik>
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

  if (!data.viewer) return null;

  return <UserProfilePage user={data} />;
};

export default () => {
  return (
    <Suspense fallback={<div> Cargando... </div>}>
      <UserProfilePageContainer />
    </Suspense>
  );
}
