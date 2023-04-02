import { Flex, Heading, Text, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from '../components/Button';
import logo from '../assets/logo_wo_text.png';
import { useMutation } from 'react-relay';
import LoginMutationDef from 'graphql/LoginMutation';
import useToast from '../hooks/useToast';
import { LoginMutation, LoginMutation$data } from '__generated__/LoginMutation.graphql';

const LoginPage = () => {
  const toast = useToast();
  const [commitMutation, isMutationInFlight] =
    useMutation<LoginMutation>(LoginMutationDef);
  const navigate = useNavigate();

  const [_, setToken] = useLocalStorage('token', null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [data, setData] = useState({ errorMessage: '', isLoading: false });

  const CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'fake-id';
  const SCOPE = process.env.GITHUB_SCOPE || 'repo';

  const handleGithubLogin = () => {
    setIsLoggingIn(true);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
  };

  useEffect(() => {
    if (!isLoggingIn && !isMutationInFlight) {
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

        const variables = {
          code: requestData.code,
        };

        commitMutation({
          variables,
          onCompleted: (response: LoginMutation$data, errors) => {
            if (!errors?.length || response.login?.token) {
              setToken(response.login?.token);
              setIsLoggingIn(false);
              console.log(response.login?.token);
              navigate('/');
            } else {
              toast({
                title: 'Error',
                description: 'No ha sido posible ingresar',
                status: 'error',
              });
            }
          },
        });
      }
    }
  }, [isLoggingIn, isMutationInFlight]);

  if (isLoggingIn || isMutationInFlight) {
    return <div>Logging in...</div>;
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
      <Button colorScheme={'blue'} onClick={handleGithubLogin} size={'lg'}>
        Ingresar
      </Button>
    </Flex>
  );
};

export default LoginPage;
