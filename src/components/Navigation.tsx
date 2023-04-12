import { ReactNode, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';
import { Stack, Switch } from '@chakra-ui/react';
import { useFragment, useLazyLoadQuery, useMutation } from 'react-relay';

import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import Heading from 'components/Heading';

import { NavigationQuery } from '__generated__/NavigationQuery.graphql';
import {
  NavigationCourseInfo$data,
  NavigationCourseInfo$key,
} from '__generated__/NavigationCourseInfo.graphql';
import IconButton from './IconButton';
import { MdLogout } from 'react-icons/md';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  LogoutMutation,
  LogoutMutation$data,
} from '__generated__/LogoutMutation.graphql';
import LogoutMutationDef from '../graphql/LogoutMutation';
import useToast from '../hooks/useToast';

const NavigationBarStyle = {
  background: 'white',
  position: 'fixed',
  justifyContent: 'right',
  padding: '25px',
  width: '100%',
  height: '10%',
} as const;

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

const NavigationTitle = ({ viewerRef }: { viewerRef: NavigationCourseInfo$key }) => {
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

  const handleGoToProfile = () => navigate('/profile');
  const handleGoToCourses = () => navigate('/courses');
  const _handleGoToAssignments = () => navigate('/assignments');

  const handleLogout = () => {
    commitLogoutMutation({
      variables: { token },
      onCompleted: (response: LogoutMutation$data, errors) => {
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

  const NavigatorButton = ({
    children,
    onClick,
  }: {
    children: any;
    onClick?: () => void;
  }) => {
    return (
      <Button w={maxWidth} onClick={onClick}>
        {children}
      </Button>
    );
  };

  return (
    <Stack shadow="lg" direction="row" style={NavigationBarStyle} align="center">
      <Suspense>
        <NavigationTitle viewerRef={viewerData.viewer} />
      </Suspense>
      <DevControl />

      {isTeacher ? (
        <>
          <NavigatorButton>Asignar correctores</NavigatorButton>
          <NavigatorButton>Crear repositorios</NavigatorButton>
        </>
      ) : (
        <>
          <Button w={maxWidth}>Realizar entrega</Button>
        </>
      )}
      <NavigatorButton onClick={handleGoToCourses}>Cursos</NavigatorButton>
      <NavigatorButton onClick={handleGoToProfile}>Mi perfil</NavigatorButton>
      <IconButton
        variant="ghost"
        size="xs"
        aria-label="Cerrar Sesión"
        as={MdLogout}
        // colorScheme="transparent"
        // color="black"
        onClick={handleLogout}
        _hover={{ backgroundColor: 'lightGray', cursor: 'pointer' }}
      />
    </Stack>
  );
};

const Navigation = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <NavigationBar />
      <Box
        style={{
          width: '100%',
          height: '100%',
          zIndex: '-1',
          position: 'absolute',
          top: '105px',
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Navigation;
