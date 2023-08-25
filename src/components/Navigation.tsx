import { ReactNode, Suspense, useState } from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';

import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { HStack, Link, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';

import Box from 'components/Box';
import Button from 'components/Button';
import Avatar from 'components/Avatar';
import Menu, { Props as MenuProps } from 'components/Menu';
import Divider from 'components/Divider';
import HomeButton from 'components/HomeButton';

import { theme } from 'theme';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { Permission, useUserContext } from 'hooks/useUserCourseContext';
import useToast from 'hooks/useToast';

import InviteUserModal from 'layout/InviteUserModal';

import LogoutMutationDef from 'graphql/LogoutMutation';

import {
  LogoutMutation,
  LogoutMutation$data,
} from '__generated__/LogoutMutation.graphql';
import { NavigationQuery } from '__generated__/NavigationQuery.graphql';

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
  const [token, setToken] = useLocalStorage('token', null);
  const [commitLogoutMutation] = useMutation<LogoutMutation>(LogoutMutationDef);

  const courseContext = useUserContext();
  const navigate = useNavigate();

  const [inviteUserOpen, setInviteUserOpen] = useState(false);

  const viewerData = useLazyLoadQuery<NavigationQuery>(
    graphql`
      query NavigationQuery {
        viewer {
          id
          name
          lastName
        }
        ...AvailableRolesFragment
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

  const teacherActions: MenuProps['content']['items'] = [];

  if (courseContext.userHasPermission(Permission.InviteUser)) {
    teacherActions.push({
      content: 'Invitar usuario',
      action: () => setInviteUserOpen(v => !v),
    });
  }

  const studentActions = [];

  if (courseContext.userHasPermission(Permission.SubmitAssignment)) {
    studentActions.push({
      content: 'Realizar nueva entrega',
      action: () => {
        navigate(`/courses/${courseContext.courseId}/add-submission`);
      },
    });
  }

  if (courseContext.userHasPermission(Permission.ManageOwnGroups)) {
    studentActions.push({
      content: 'Gestionar mis grupos',
      action: () => {
        navigate(`/courses/${courseContext.courseId}/my-groups`);
      },
    });
  }

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

      <Divider h="75%" />

      <HStack flex="1" spacing="auto">
        <MainRoutes />
        <Menu
          content={{
            menuButton: (
              <Button as="div" variant="ghost" rightIcon={<ChevronDownIcon />}>
                <AddIcon />
              </Button>
            ),
            items: courseContext.userIsTeacher ? teacherActions : studentActions,
          }}
        />
      </HStack>

      <Menu
        content={{
          // Take only first name
          menuButton: (
            <Avatar
              name={`${viewerData.viewer.name.split(' ')[0]} ${
                viewerData.viewer.lastName
              }`}
            />
          ),
          items: [
            { content: 'Ver perfil', action: handleGoToProfile },
            { content: 'Salir', action: handleLogout },
          ],
        }}
      />

      {courseContext.courseId && (
        <InviteUserModal
          isOpen={inviteUserOpen}
          rootQueryRef={viewerData}
          onClose={() => setInviteUserOpen(false)}
          courseId={courseContext.courseId}
        />
      )}
    </HStack>
  );
};

const LoadingNavigationBar = () => {
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
      <HomeButton w="60px" h="70px" />
      <Divider h="75%" />

      <HStack flex="1">
        <Skeleton flex="1" height={'30px'} />
        <Skeleton flex="1" height={'30px'} />
        <Skeleton flex="1" height={'30px'} />
      </HStack>

      <Menu
        content={{
          menuButton: <SkeletonCircle />,
          items: [],
        }}
      />
    </HStack>
  );
};

const Navigation = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <Suspense fallback={<LoadingNavigationBar />}>
        <NavigationBar />
      </Suspense>
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
