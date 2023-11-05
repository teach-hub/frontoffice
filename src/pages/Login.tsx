import {
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-relay';

import logo from 'assets/logo_wo_text.png';

import LoginMutationDef from 'graphql/LoginMutation';
import RegisterMutationDef from 'graphql/RegisterUserMutation';

import {
  LocalStorageKeys,
  storeGetAndClearValue,
  storeGetValue,
  storeSetValue,
} from 'hooks/useLocalStorage';
import useToast, { showErrorToast, showSuccessToast } from 'hooks/useToast';
import { isAuthenticated } from 'auth/utils';

import { FormErrors, Mutable } from 'types';

import Button from 'components/Button';
import Form from 'components/Form';
import InputField from 'components/InputField';

import type {
  LoginMutation,
  LoginMutation$data,
} from '__generated__/LoginMutation.graphql';
import type {
  RegisterUserMutation,
  RegisterUserMutation$data,
} from '__generated__/RegisterUserMutation.graphql';
import Spinner from 'components/Spinner';

type RegisterData = {
  name?: string;
  lastName?: string;
  file?: string;
  notificationEmail?: string;
  githubId?: string;
};

type LoginPageProps = {
  redirectTo?: string;
};

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || 'fake-id';
const SCOPE = process.env.REACT_APP_GITHUB_SCOPE || 'repo';

const buildGithubAuthURL = () =>
  `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

// Este form funciona de la siguiente forma
// - Redireccionamos al usuario a la pagina de github para que se loguee. (Linea 20).
// - Cuando el usuario se loguea, github nos redirecciona a la pagina con un codigo en la url.
// - Si el codigo esta en la url, hacemos un request a nuestro backend para intercambiar el codigo por un token.
// - Si el usuario no esta registrado, el backend nos devuelve un error y mostramos el form de registro.
// - Si el usuario esta registrado, el backend nos devuelve un token y lo guardamos en el local storage.

const LoginPage = (props: LoginPageProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commitLoginMutation, isLoginMutationInFlight] =
    useMutation<LoginMutation>(LoginMutationDef);

  const navigate = useNavigate();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [data, setData] = useState({ errorMessage: '', isLoading: false });

  useEffect(() => {
    if (!isLoggingIn && !isLoginMutationInFlight) {
      const url = window.location.href;
      const [baseUrl, code] = url.split('?code='); // Get Github code

      // If Github API returns the code parameter
      if (code) {
        window.history.pushState({}, '', baseUrl);
        setData({ ...data, isLoading: true });

        loginAndRedirect(code);
      }
    }
  }, [isLoggingIn, isLoginMutationInFlight]);

  const handleGithubLogin = () => {
    if (props.redirectTo) {
      // Guardamos el valor del estado para tenerlo cuando volvamos de Github.
      storeSetValue(LocalStorageKeys.RedirectTo, props.redirectTo);
    }

    setIsLoggingIn(true);
    window.location.href = buildGithubAuthURL();
  };

  const loginAndRedirect = async (code: string) => {
    commitLoginMutation({
      variables: { code },
      onCompleted: (response: LoginMutation$data, errors) => {
        if (!errors?.length) {
          const { token, shouldPerformRegistration } = response.login || {};

          // Set token either if user is logged in, or sign up is required.
          if (token) {
            console.log('Setting new token value.');
            storeSetValue('token', token);
          }

          if (!shouldPerformRegistration) {
            setIsLoggingIn(false);

            const savedRedirectTo = storeGetAndClearValue(LocalStorageKeys.RedirectTo);
            navigate(savedRedirectTo ? savedRedirectTo : '/');
          } else {
            onOpen(); // Open register form
          }
        } else {
          showErrorToast({
            toast,
            title: 'Error',
            description: `No ha sido posible ingresar: ${errors[0].message}`,
          });
        }
      },
    });
  };

  if (isLoggingIn || isLoginMutationInFlight) {
    return (
      <Spinner
        isOpen={true}
        onClose={() => {
          // Do nothing
        }}
      />
    );
  }

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      direction={'column'}
      align={'center'}
      justify={'center'}
    >
      <Image src={logo} width={'10vw'} />
      <Heading as="h1" marginTop={'3vh'} marginBottom={'3vh'}>
        Bienvenido a Teachhub!
      </Heading>
      <Text fontSize={'2xl'} marginBottom={'5vh'}>
        Accede a través de tu cuenta de GitHub
      </Text>
      <Button onClick={handleGithubLogin} size={'lg'}>
        Ingresar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Completa tus datos</ModalHeader>
          <ModalBody>
            <RegisterForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

type Props = {
  onClose: () => void;
};

const RegisterForm = ({ onClose }: Props): JSX.Element => {
  const toast = useToast();
  const navigate = useNavigate();

  const [hasFile, setHasFile] = useState(true);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [commitRegisterMutation] = useMutation<RegisterUserMutation>(RegisterMutationDef);

  type FormValues = Mutable<NonNullable<RegisterData>>;

  const validateForm = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values?.name) {
      errors.name = 'Obligatorio';
    }
    if (!values?.lastName) {
      errors.lastName = 'Obligatorio';
    }
    if (!values?.file && hasFile) {
      errors.file = 'Obligatorio';
    }

    if (!values?.notificationEmail) {
      errors.notificationEmail = 'Obligatorio';
    }

    return errors;
  };

  const onSubmit = (variables: FormValues) => {
    setShowSpinner(true);
    commitRegisterMutation({
      variables: {
        ...variables,
        file: variables.file ? String(variables.file) : variables.file,
      },
      onCompleted: (response: RegisterUserMutation$data, errors) => {
        setShowSpinner(false);
        const name = response.registerUser?.name;
        if (!errors?.length) {
          const redirectTo = storeGetAndClearValue(LocalStorageKeys.RedirectTo);
          navigate(redirectTo ? redirectTo : '/');
          showSuccessToast({
            toast,
            title: `Bienvenido ${name}!`,
          });
        } else {
          onClose();
          showErrorToast({
            toast,
            title: 'Error',
            description: `No ha sido posible registrarse: ${errors[0].message}`,
          });
        }
      },
    });
  };

  return (
    <Flex direction="column" gap={'30px'}>
      <Spinner
        isOpen={showSpinner}
        onClose={() => {
          setShowSpinner(false);
        }}
      />
      <Flex width={'full'} justifyContent={'flex-start'} gap={'20px'}>
        <Text fontWeight="bold">¿Tenes padrón?</Text>
        <Switch id="has-file" isChecked={hasFile} onChange={() => setHasFile(!hasFile)} />
      </Flex>
      <Form
        initialValues={{}}
        buttonsEnabled={true}
        validateForm={validateForm}
        onCancelForm={{
          text: 'Cancelar',
          onClick: onClose,
        }}
        onSubmitForm={{
          text: 'Registrarme',
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
              />
            ),
            label: 'Apellido',
            readError: e => e.lastName as string,
          },
          {
            inputComponent: (values, handleChange) => (
              <InputField
                id={'notificationEmail'}
                value={values?.notificationEmail}
                onChange={handleChange}
                placeholder={'mail@mail.com'}
                type={'email'}
              />
            ),
            label: 'Email (notificaciones)',
            readError: e => e.notificationEmail as string,
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
              />
            ),
            label: 'Padrón',
            readError: e => e.file as string,
          },
        ]}
      />
    </Flex>
  );
};

// Wrapper alrededor del LoginPage para que no se pueda acceder a /login
// si el usuario ya esta logueado.

const LoginLayout = (): JSX.Element => {
  const token = storeGetValue('token');

  // Puede ser que el usuario tenga una ruta previa a /login
  // en ese caso se redirige a esa ruta luego de loguearse.
  const { state: locationState } = useLocation();

  if (isAuthenticated(token)) {
    /*
     * Si el usuario ya esta logueado /login devuelve a Home.
     */
    return <Navigate to={'/'} />;
  }

  const redirectTo = locationState ? locationState.redirectTo : undefined;
  return <LoginPage redirectTo={redirectTo} />;
};

export default LoginLayout;
