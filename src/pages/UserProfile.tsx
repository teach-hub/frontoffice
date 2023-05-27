import { Suspense, useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';

import { Spinner } from '@chakra-ui/react';

import { PayloadError } from 'relay-runtime';

import AvatarImage from 'components/AvatarImage';
import Box from 'components/Box';
import Heading from 'components/Heading';
import Navigation from 'components/Navigation';
import { Form } from 'components/Form';
import InputField from 'components/InputField';
import PageDataContainer from 'components/PageDataContainer';

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

import type { FormErrors, Mutable } from 'types';

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
        file: values?.file,
        name: values?.name,
        lastName: values?.lastName,
        githubId: values?.githubId,
        notificationEmail: values?.notificationEmail,
      },
      onCompleted: onMutationComplete,
    });
  };

  const onCancel = () => setIsEditing(false);

  type FormValues = Mutable<Omit<NonNullable<UserProfileQuery$data['viewer']>, 'id'>>;

  const validateForm = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values?.name) {
      errors.name = 'Nombre no puede ser vacio';
    }

    if (!values?.lastName) {
      errors.lastName = 'Nombre no puede ser vacio';
    }

    if (!values?.file) {
      errors.lastName = 'El padron no puede estar vacio';
    }

    // TODO. Validar que el email tenga forma de email.

    return errors;
  };

  if (showSpinner || !queryResult) return <Spinner />;

  return (
    <PageDataContainer>
      <Heading paddingBottom={'5vh'}>Perfil de {queryResult.name}</Heading>
      <Box display="flex" flexDir="row" justifyContent="space-evenly">
        <AvatarImage
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          url="https://bit.ly/sage-adebayo" // TODO TH-67: Add avatar image to user?
        />
        <Form
          buttonsEnabled={isEditing}
          initialValues={{
            name: queryResult.name || '',
            lastName: queryResult.lastName || '',
            file: queryResult.file || '',
            notificationEmail: queryResult.notificationEmail || '',
            githubId: queryResult.githubId || '',
          }}
          validateForm={validateForm}
          onCancelForm={{
            text: 'Cancelar',
            onClick: onCancel,
          }}
          onSubmitForm={{
            text: 'Guardar',
            onClick: onSubmit,
          }}
          inputFields={[
            {
              inputComponent: (values, handleChange) => (
                <InputField
                  id={'name'}
                  value={values?.name}
                  onChange={handleChange}
                  placeholder={'Nombre'}
                  type={'text'}
                  isReadOnly={!isEditing}
                />
              ),
              label: 'Nombre',
              readError: e => e.name as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <InputField
                  id={'lastName'}
                  value={values?.lastName}
                  onChange={handleChange}
                  placeholder={'Apellido'}
                  type={'text'}
                  isReadOnly={!isEditing}
                />
              ),
              label: 'Apellido',
              readError: e => e.lastName as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <InputField
                  id={'file'}
                  value={values?.file}
                  onChange={handleChange}
                  placeholder={'12345'}
                  type={'number'}
                  pattern={'[0-9]*'} // allow only digits
                  inputMode={'numeric'}
                  isReadOnly={!isEditing}
                />
              ),
              label: 'Padrón',
              readError: e => e.file as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <InputField
                  id={'notificationEmail'}
                  value={values?.notificationEmail}
                  onChange={handleChange}
                  placeholder={'mail@mail.com'}
                  type={'email'}
                  isReadOnly={!isEditing}
                />
              ),
              label: 'Email (notificaciones)',
              readError: e => e.notificationEmail as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <InputField
                  id={'githubId'}
                  value={values?.githubId}
                  onChange={handleChange}
                  placeholder={'12345'}
                  type={'text'}
                  isReadOnly={true}
                />
              ),
              label: 'Usuario de Github',
              readError: e => e.githubId as string,
            },
          ]}
        />
      </Box>
    </PageDataContainer>
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
