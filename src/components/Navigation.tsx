import { ReactNode, Suspense, useEffect, useState } from 'react';
import { Link as ReachLink, useLocation, useNavigate, useParams } from 'react-router-dom';

import { graphql } from 'babel-plugin-relay/macro';
import { useFragment, useLazyLoadQuery, useMutation } from 'react-relay';
import { Link, Divider, Image, Avatar, HStack, Switch } from '@chakra-ui/react';

import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import Heading from 'components/Heading';

import IconButton from './IconButton';
import { MdLogout } from 'react-icons/md';
import { useLocalStorage } from 'hooks/useLocalStorage';
import LogoutMutationDef from 'graphql/LogoutMutation';
import useToast from 'hooks/useToast';
import { theme } from 'theme';

import {
  NavigationCourseInfo$data,
  NavigationCourseInfo$key,
} from '__generated__/NavigationCourseInfo.graphql';
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

const CourseTitle = ({ viewerRef }: { viewerRef: NavigationCourseInfo$key }) => {
  const result: NavigationCourseInfo$data = useFragment(
    graphql`
      fragment NavigationCourseInfo on ViewerType {
        findCourse(id: $courseId) {
          id
          name
        }
      }
    `,
    viewerRef
  );

  return <Heading size="lg">{result?.findCourse?.name}</Heading>;
};

const _NavigationTitle = ({ viewerRef }: { viewerRef: NavigationCourseInfo$key }) => {
  const { courseId } = useParams();
  const location = useLocation();

  // @ts-expect-error
  if (!viewerRef?.name) {
    return null;
  }

  let pageTitle = null;

  switch (location.pathname) {
    case '/courses':
      pageTitle = 'Mis cátedras';
      break;
    default:
      pageTitle = null;
  }

  return (
    <Box alignItems="center" display="flex" flexGrow="1">
      {courseId && <CourseTitle viewerRef={viewerRef} />}
      <Heading size="lg">{pageTitle}</Heading>
    </Box>
  );
};

const NAVIGATION_HEIGHT_PX = 100;

const NavigationBar = () => {
  const toast = useToast();
  const [isTeacher, setIsTeacher] = useState(false);
  const [token, setToken] = useLocalStorage('token', null);
  const [commitLogoutMutation, _] = useMutation<LogoutMutation>(LogoutMutationDef);

  /* Set width of buttons to the biggest one */
  const [maxWidth, setMaxWidth] = useState('auto');

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

  const { courseId } = useParams();
  const navigate = useNavigate();

  const viewerData = useLazyLoadQuery<NavigationQuery>(
    graphql`
      query NavigationQuery($courseId: String!, $shouldFetchCourseInfo: Boolean!) {
        viewer {
          id
          name
          ...NavigationCourseInfo @include(if: $shouldFetchCourseInfo)
        }
      }
    `,
    {
      shouldFetchCourseInfo: !!courseId,
      courseId: courseId || '',
    }
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
      spacing="20px"
      shadow="lg"
      direction="row"
      bg={theme.colors.teachHub.secondary}
      position="fixed"
      paddingX="1%"
      width="100%"
      top="0px"
      left="0px"
      right="0px"
      zIndex="1px"
      height={`${NAVIGATION_HEIGHT_PX}px`}
    >
      <Suspense>{/* <NavigationTitle viewerRef={viewerData.viewer} /> */}</Suspense>

      <Box
        _hover={{
          transition: '.3s',
          filter: 'blur(1px)',
          cursor: 'pointer',
        }}
      >
        <Image
          h="70px"
          w="65px"
          src={require('../assets/logo_wo_text.png')}
          onClick={() => navigate('/')}
        />
      </Box>

      <Divider borderColor={'gray.500'} height={'70%'} orientation="vertical" />

      <HStack flex="1" spacing="auto">
        <HStack spacing="30px" direction={'row'}>
          <Link as={ReachLink} to="/courses">
            {' '}
            Cursos
          </Link>
        </HStack>

        <HStack direction={'row-reverse'}>
          {isTeacher ? (
            <>
              <Button> Asignar correctores </Button>
              <Button> Crear repositorios </Button>
            </>
          ) : (
            <>
              <Button> Realizar entrega </Button>
            </>
          )}
        </HStack>
      </HStack>

      <Avatar
        _hover={{
          transition: '.3s',
          filter: 'blur(1px)',
          cursor: 'pointer',
        }}
        borderWidth="1px"
        borderColor="black.100"
        onClick={() => navigate('/profile')}
        src="https://bit.ly/sage-adebayo"
      />

      <IconButton
        variant="ghost"
        size="xs"
        aria-label="Cerrar Sesión"
        as={MdLogout}
        onClick={handleLogout}
        _hover={{ backgroundColor: 'lightGray', cursor: 'pointer' }}
      />

      {/**
       * Control temporal para emular roles, no queda en la entrega final
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
