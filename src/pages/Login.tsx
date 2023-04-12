import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from '../components/Button';
import logo from '../assets/logo_wo_text.png';
import { useMutation } from 'react-relay';
import LoginMutationDef from 'graphql/LoginMutation';
import RegisterMutationDef from 'graphql/RegisterUserMutation';
import useToast from '../hooks/useToast';
import { LoginMutation, LoginMutation$data } from '__generated__/LoginMutation.graphql';
import {
  RegisterUserMutation,
  RegisterUserMutation$data,
} from '../__generated__/RegisterUserMutation.graphql';
import { FormErrors, Mutable } from '../types';
import { Form, Formik } from 'formik';
import Box from '../components/Box';
import InputField from '../components/InputField';

type RegisterData = {
  name?: string;
  lastName?: string;
  file?: string;
  notificationEmail?: string;
  githubId?: string;
};

type Props = {
  initialValues: RegisterData;
};

const LoginPage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commitLoginMutation, isLoginMutationInFlight] =
    useMutation<LoginMutation>(LoginMutationDef);
  const navigate = useNavigate();

  const [_, setToken] = useLocalStorage('token', null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [data, setData] = useState({ errorMessage: '', isLoading: false });

  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || 'fake-id';
  const SCOPE = process.env.REACT_APP_GITHUB_SCOPE || 'repo';

  const handleGithubLogin = () => {
    setIsLoggingIn(true);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
  };

  const loginAndRedirect = async (code: string) => {
    commitLoginMutation({
      variables: { code },
      onCompleted: (response: LoginMutation$data, errors) => {
        if (!errors?.length || response.login?.token) {
          const token = response.login?.token;
          const userRegistered = response.login?.userRegistered || false;
          setToken(token); // Set token both if logged in, or if sign up is required

          if (userRegistered) {
            setIsLoggingIn(false);
            navigate('/');
          } else {
            onOpen(); // Open register form
          }
        } else {
          toast({
            title: 'Error',
            description: `No ha sido posible ingresar: ${errors[0].message}`,
            status: 'error',
          });
        }
      },
    });
  };

  useEffect(() => {
    if (!isLoggingIn && !isLoginMutationInFlight) {
      const url = window.location.href;
      const hasCode = url.includes('?code='); // Get Github code

      // If Github API returns the code parameter
      if (hasCode) {
        const newUrl = url.split('?code=');
        window.history.pushState({}, '', newUrl[0]);
        setData({ ...data, isLoading: true });

        const requestData = {
          code: newUrl[1],
        };

        loginAndRedirect(requestData.code);
      }
    }
  }, [isLoggingIn, isLoginMutationInFlight]);

  if (isLoggingIn || isLoginMutationInFlight) {
    return <div>Logging in...</div>;
  }

  const RegisterForm = ({ initialValues }: Props): JSX.Element => {
    const [hasFile, setHasFile] = useState(true);
    const [commitRegisterMutation, isRegisterMutationInFlight] =
      useMutation<RegisterUserMutation>(RegisterMutationDef);

    type FormValues = Mutable<NonNullable<RegisterData>>;

    const validateForm = (values: FormValues): FormErrors<FormValues> => {
      const errors: FormErrors<FormValues> = {};

      if (!values.name) errors.name = 'Obligatorio';
      if (!values.lastName) errors.lastName = 'Obligatorio';
      if (!values.file && hasFile) errors.file = 'Obligatorio';

      return errors;
    };

    const onSubmit = (variables: FormValues) => {
      commitRegisterMutation({
        variables: {
          ...variables,
          file: variables.file ? String(variables.file) : variables.file,
        },
        onCompleted: (response: RegisterUserMutation$data, errors) => {
          const token = response.registerUser?.token;
          if (!errors?.length) {
            setToken(token);
            onClose(); // Close modal
            navigate('/');
            toast({
              title: 'Usuario registrado!',
              description: 'Usuario registrado',
              status: 'info',
            });
          } else {
            setToken(null); // If register failed remove token
            onClose();
            toast({
              title: 'Error',
              description: `No ha sido posible registrarse: ${errors[0].message}`,
              status: 'error',
            });
          }
        },
      });
    };

    return (
      <Formik
        initialValues={{
          name: initialValues.name || '',
          lastName: initialValues.lastName || '',
          file: initialValues.file || '',
          notificationEmail: initialValues.notificationEmail || '',
        }}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, isSubmitting, isValid, handleSubmit }) => (
          <Form>
            <Box padding="10px">
              <FormControl display="flex">
                <FormLabel fontWeight="bold">¿Tenes padrón?</FormLabel>
                <Switch
                  id="has-file"
                  isChecked={hasFile}
                  onChange={() => setHasFile(!hasFile)}
                />
              </FormControl>
            </Box>
            {hasFile && (
              <Box padding="10px">
                <FormControl fontWeight="bold" isInvalid={!!errors.file}>
                  <FormLabel htmlFor="has-file" fontWeight="bold">
                    Padron
                  </FormLabel>
                  <InputField
                    id="file"
                    value={values.file}
                    onChange={handleChange}
                    placeholder="12345"
                    type="number"
                    pattern="[0-9]*" // allow only digits
                    inputMode="numeric" // show numeric keyboard on mobile devices
                  />
                  <FormErrorMessage>{errors.file}</FormErrorMessage>
                </FormControl>
              </Box>
            )}
            <Box padding="10px">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel fontWeight="bold">Nombre</FormLabel>
                <InputField
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  type="text"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box padding="10px">
              <FormControl fontWeight="bold" isInvalid={!!errors.lastName}>
                <FormLabel fontWeight="bold">Apellido</FormLabel>
                <InputField
                  id="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Apellido"
                  type="text"
                />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box padding="10px">
              <FormControl fontWeight="bold" isInvalid={!!errors.notificationEmail}>
                <FormLabel fontWeight="bold">Email (para notificaciones)</FormLabel>
                <InputField
                  id="notificationEmail"
                  name="notificationEmail"
                  value={values.notificationEmail}
                  onChange={handleChange}
                  placeholder="mail@fi.uba.ar"
                  type="email"
                />
                <FormErrorMessage>{errors.notificationEmail}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box my={15} display={'flex'} justifyContent={'flex-end'}>
              <Button
                variant="ghost"
                mr={'10%'}
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button disabled={isSubmitting || !isValid} onClick={() => handleSubmit()}>
                Registrarme
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };

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
            <RegisterForm initialValues={{}} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default LoginPage;
