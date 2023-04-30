import { ReactNode, useEffect, useState } from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';

import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { Link, HStack, Switch } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';

import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import Menu from 'components/Menu';
import Divider from 'components/Divider';
import HomeButton from 'components/HomeButton';
import InviteUserModal from 'components/InviteUserModal';

import { useLocalStorage } from 'hooks/useLocalStorage';
import LogoutMutationDef from 'graphql/LogoutMutation';
import useToast from 'hooks/useToast';
import { theme } from 'theme';

import {
  LogoutMutation,
  LogoutMutation$data,
} from '__generated__/LogoutMutation.graphql';
import { NavigationQuery } from '__generated__/NavigationQuery.graphql';

const DevControlStyle = {
  shadow: 'md',
  borderWidth: 'thin',
  borderColor: 'black',
  borderRadius: '5px',
  background: 'green.100',
  bottom: '20px',
  position: 'fixed',
  flex: '1',
  alignItems: 'center',
  display: 'flex',
};

const MainRoutes = () => {
  return (
    <HStack spacing="30px">
      <Link as={ReachLink} to="/courses">
        Cursos
      </Link>
    </HStack>
  );
};

const NAVIGATION_HEIGHT_PX = 95;

const NavigationBar = () => {
  const toast = useToast();
  const [isTeacher, setIsTeacher] = useState(false);
  const [token, setToken] = useLocalStorage('token', null);
  const [commitLogoutMutation, _] = useMutation<LogoutMutation>(LogoutMutationDef);

  /* Set width of buttons to the biggest one */
  const [maxWidth, setMaxWidth] = useState('auto');
  const [inviteUserOpen, setInviteUserOpen] = useState(false);

  useEffect(() => {
    // Find the maximum width of the buttons
    const buttons = document.querySelectorAll('button');
    let maxWidth = 0;
    buttons.forEach(button => {
      const width = button.offsetWidth;
      if (width > maxWidth) {
        maxWidth = width;
      }
    });
    setMaxWidth(`${maxWidth}px`);
  }, []);

  const navigate = useNavigate();

  const viewerData = useLazyLoadQuery<NavigationQuery>(
    graphql`
      query NavigationQuery {
        viewer {
          id
          name
        }
      }
    `,
    {}
  );

  if (!viewerData?.viewer?.id) {
    return null;
  }

  const handleLogout = () => {
    commitLogoutMutation({
      variables: { token },
      onCompleted: (_: LogoutMutation$data, errors) => {
        if (!errors?.length) {
          setToken(null);
          navigate('/login');
        } else {
          toast({
            title: 'Error',
            description: 'No ha sido posible cerrar sesión, intenta de nuevo',
            status: 'error',
          });
        }
      },
    });
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const DevControl = () => {
    return (
      <Box sx={DevControlStyle}>
        <Switch
          isChecked={!!isTeacher}
          onChange={() => setIsTeacher(c => !c)}
          padding="10px"
          size="lg"
        />
        <Text padding="10px">
          <b>Soy profesor</b>
        </Text>
      </Box>
    );
  };

  return (
    <HStack
      spacing="25px"
      shadow="lg"
      direction="row"
      bg={theme.colors.teachHub.secondary}
      position="fixed"
      paddingX="1.5%"
      width="100%"
      top="0px"
      left="0px"
      right="0px"
      zIndex="1px"
      height={`${NAVIGATION_HEIGHT_PX}px`}
    >
      <HomeButton w="60px" h="70px" onClick={() => navigate('/')} />

      <Divider borderColor={theme.colors.teachHub.primary} h="75%" />

      <HStack flex="1" spacing="auto">
        <MainRoutes />
        <Menu
          content={{
            menuButton: (
              <Button variant="ghost" rightIcon={<ChevronDownIcon />}>
                <AddIcon />
              </Button>
            ),
            items: isTeacher
              ? [
                  { content: 'Asignar correctores' },
                  { content: 'Crear repositorios' },
                  {
                    content: 'Invitar usuario',
                    action: () => setInviteUserOpen(v => !v),
                  },
                ]
              : [{ content: 'Realizar entrega' }],
          }}
        />
      </HStack>

      <Menu
        content={{
          menuButton: (
            // TODO: TH-67
            <Avatar src="https://bit.ly/sage-adebayo" />
          ),
          items: [
            { content: 'Ver perfil', action: handleGoToProfile },
            { content: 'Salir', action: handleLogout },
          ],
        }}
      />

      {/* @ts-expect-error */}
      <InviteUserModal isOpen={inviteUserOpen} onClose={() => setInviteUserOpen(false)} />

      {/**
       * (TODO TH-68) Control temporal para emular roles, no queda en la entrega final
       */}
      <DevControl />
    </HStack>
  );
};

const Navigation = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <NavigationBar />
      <Box
        w="100%"
        h="100%"
        zIndex="-1"
        position="absolute"
        top={`${NAVIGATION_HEIGHT_PX + 30}px`}
      >
        {children}
      </Box>
    </>
  );
};

export default Navigation;
