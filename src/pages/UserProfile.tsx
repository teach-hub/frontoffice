import { Formik } from 'formik';
import { Suspense, useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import { PayloadError } from 'relay-runtime';

import AvatarImage from 'components/AvatarImage';
import InputField from 'components/InputField';
import Button from 'components/Button';
import Box from 'components/Box';
import Heading from 'components/Heading';
import Navigation from 'components/Navigation';

import useToast from 'hooks/useToast';

import UserProfileQueryDef from 'graphql/UserProfileQuery';
import UpdateProfileMutationDef from 'graphql/UpdateProfileMutation';

import {
  UserProfileQuery,
  UserProfileQuery$data,
} from '__generated__/UserProfileQuery.graphql';
import {
  UpdateProfileMutation,
  UpdateProfileMutation$data,
} from '__generated__/UpdateProfileMutation.graphql';
import { FormErrors, Mutable } from 'types';

const CancelButton = (rest: any) => {
  return (
    <Button {...rest} bg="red.400" color="white" w="full" _hover={{ bg: 'red.500' }}>
      Cancelar
    </Button>
  );
};

const SubmitButton = (rest: any) => {
  return (
    <Button
      {...rest}
      bg={'blue.400'}
      color={'white'}
      w="full"
      _hover={{
        bg: 'blue.500',
      }}
    >
      Guardar
    </Button>
  );
};

type Props = {
  user: UserProfileQuery$data;
};

const UserProfilePage = ({ user }: Props): JSX.Element => {
  const toast = useToast();
  const [commitMutation] = useMutation<UpdateProfileMutation>(UpdateProfileMutationDef);

  const [queryResult, setResult] = useState<UserProfileQuery$data['viewer']>(user.viewer);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const onMutationComplete = (
    response: UpdateProfileMutation$data,
    errors: PayloadError[] | null
  ) => {
    setShowSpinner(false);
    setIsEditing(false);

    if (!errors?.length) {
      if (response.updateUser) {
        // @ts-expect-error
        setResult({ ...response.updateUser, id: queryResult.id });
      }
      toast({
        title: '¡Usuario actualizado!',
        description: 'El usuario fue actualizado',
        status: 'success',
      });
    } else {
      toast({
        title: 'Error',
        description: 'El usuario no pudo ser actualizado',
        status: 'error',
      });
    }
  };

  const onSubmit = (values: FormValues) => {
    if (!queryResult?.id) {
      throw new Error('No user id!');
    }

    setShowSpinner(true);

    commitMutation({
      variables: {
        id: queryResult.id,
        file: values.file,
        name: values.name,
        lastName: values.lastName,
        githubId: values.githubId,
        notificationEmail: values.notificationEmail,
      },
      onCompleted: onMutationComplete,
    });
  };

  const onCancel = () => setIsEditing(false);

  type FormValues = Mutable<Omit<NonNullable<UserProfileQuery$data['viewer']>, 'id'>>;

  const validateForm = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values.name) {
      errors.name = 'Nombre no puede ser vacio';
    }

    if (!values.lastName) {
      errors.lastName = 'Nombre no puede ser vacio';
    }

    if (!values.file) {
      errors.lastName = 'El padron no puede estar vacio';
    }

    // TODO. Validar que el email tenga forma de email.

    return errors;
  };

  if (showSpinner || !queryResult) return <Spinner />;

  return (
    <Box padding="20%" paddingTop="50px">
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        Perfil de {queryResult.name}
      </Heading>
      <Box display="flex" flexDir="row">
        <AvatarImage
          onEdit={() => setIsEditing(true)}
          url="https://bit.ly/sage-adebayo" // TODO TH-67: Add avatar image to user
        />

        <Formik
          initialValues={{
            name: queryResult.name || '',
            lastName: queryResult.lastName || '',
            file: queryResult.file || '',
            notificationEmail: queryResult.notificationEmail || '',
            githubId: queryResult.githubId || '',
          }}
          validate={validateForm}
          onSubmit={onSubmit}
          onReset={onCancel}
        >
          {({ values, errors, handleReset, handleChange, handleSubmit }) => {
            return (
              <Box flex="1">
                <Box padding="10px">
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Nombre</FormLabel>
                    <InputField
                      id="name"
                      isReadOnly={!isEditing}
                      value={values.name}
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
                      value={values.lastName}
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
                      value={values.file}
                      onChange={handleChange}
                      placeholder="12345"
                      type="text"
                    />
                    <FormErrorMessage>{errors.file}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box padding="10px">
                  <FormControl isInvalid={!!errors.notificationEmail}>
                    <FormLabel>Email (notificaciones)</FormLabel>
                    <InputField
                      id="notificationsEmail"
                      isReadOnly={!isEditing}
                      value={values.notificationEmail}
                      onChange={handleChange}
                      placeholder="joseph@example.com"
                      type="email"
                    />
                    <FormErrorMessage>{errors.notificationEmail}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box padding="10px">
                  <FormControl isInvalid={!!errors.githubId}>
                    <FormLabel>Usuario de Github</FormLabel>
                    <InputField
                      id="githubId"
                      isReadOnly={!isEditing}
                      value={values.githubId}
                      onChange={handleChange}
                      placeholder="michalescott"
                      type="text"
                    />
                    <FormErrorMessage>{errors.githubId}</FormErrorMessage>
                  </FormControl>
                </Box>

                {isEditing && (
                  <Stack paddingTop="40px" spacing={6} direction={['column', 'row']}>
                    <CancelButton onClick={handleReset} />
                    <SubmitButton onClick={handleSubmit} />
                  </Stack>
                )}
              </Box>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

const UserProfilePageContainer = () => {
  const data = useLazyLoadQuery<UserProfileQuery>(UserProfileQueryDef, {});

  if (!data.viewer) return null;

  return <UserProfilePage user={data} />;
};

export default () => {
  return (
    <Suspense fallback={<div> Cargando... </div>}>
      <Navigation>
        <UserProfilePageContainer />
      </Navigation>
    </Suspense>
  );
};
