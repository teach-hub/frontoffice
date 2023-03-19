import { ReactNode, useState, Suspense } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';
import { Stack, Switch } from '@chakra-ui/react';
import { createFragmentContainer, useLazyLoadQuery, useFragment } from 'react-relay';

import Box from '../components/Box';
import Button from '../components/Button';
import Text from '../components/Text';
import Heading from '../components/Heading';

import { ContextProvider } from '../hooks/useUserContext';

import { NavigationQuery } from '__generated__/NavigationQuery.graphql';
import { NavigationCourseInfo$key, NavigationCourseInfo$data } from '__generated__/NavigationCourseInfo.graphql';

const NavigationBarStyle = {
  background: 'white',
  position: 'fixed',
  justifyContent: 'right',
  padding: '25px',
  width: '100%',
  height: '10%',
} as const;

const DevControlStyle = {
  shadow: "md",
  borderWidth: "thin",
  borderColor: "black",
  borderRadius: "5px",
  background: "green.100",
  bottom: "20px",
  position: 'fixed',
  flex: "1",
  alignItems: "center",
  display: "flex"
}

const CourseTitle = ({ viewerRef }: { viewerRef: NavigationCourseInfo$key }) => {
  const result: NavigationCourseInfo$data = useFragment(
    graphql`
      fragment NavigationCourseInfo on ViewerType {
        findCourse(id: $courseId) {
          id
          name
        }
      }
    `, viewerRef)

  return <Heading size="lg">{result?.findCourse?.name}</Heading>
}

const NavigationTitle = ({ viewerRef }: { viewerRef: NavigationCourseInfo$key }) => {
  const { courseId } = useParams();
  const location = useLocation();

  let pageTitle = null;

  switch(location.pathname) {
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
  )
}

const NavigationBar = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [isTeacher, setIsTeacher] = useState(false);

  const viewerData = useLazyLoadQuery<NavigationQuery>(
    graphql`
      query NavigationQuery($courseId: Int!, $shouldFetchCourseInfo: Boolean!) {
        viewer {
          id
          name
          ...NavigationCourseInfo @include(if: $shouldFetchCourseInfo)
        }
      }
    `,
    {
      shouldFetchCourseInfo: !!courseId,
      courseId: courseId? Number(courseId): -1,
    }
  )

  console.log('--->', viewerData);

  if (!viewerData?.viewer) {
    return null;
  }

  const handleGoToProfile = () => navigate('/profile')
  const handleGoToCourses = () => navigate('/courses')

  const DevControl = () => {
    return (
      <Box sx={DevControlStyle}>
        <Switch isChecked={!!isTeacher} onChange={() => setIsTeacher(c => !c)} padding="10px" size='lg' />
        <Text padding="10px"><b>Soy profesor</b></Text>
      </Box>
    )
  }

  return (
    <Stack shadow='lg' direction='row' style={NavigationBarStyle} >
      <NavigationTitle viewerRef={viewerData.viewer} />
      <DevControl />

      {isTeacher ?
        <>
          <Button h="100%" w="10%" colorScheme="blackAlpha">
            Asignar correctores
          </Button>
          <Button h="100%" w="10%" colorScheme="blackAlpha">
            Crear repositorios
          </Button>
        </>
        :
        <>
          <Button h="100%" w="10%" colorScheme="blackAlpha">
            Realizar entrega
          </Button>
        </>
      }
      <Button h="100%" w="10%" colorScheme="blackAlpha" onClick={handleGoToCourses}>
        Cursos
      </Button>
      <Button h="100%" w="10%" colorScheme="blackAlpha">
        TPS
      </Button>
      <Button h="100%" w="10%" colorScheme="blackAlpha" onClick={handleGoToProfile}>
        Mi perfil
      </Button>
    </Stack>
  );
}

const Navigation = ({ children }: { children : ReactNode }): JSX.Element => {
  return (
      <ContextProvider>
        <NavigationBar />
        <Box style={{ width:"100%", height:"100%", zIndex: '-1', position: 'absolute', top: '105px' }}>
          {children}
        </Box>
      </ContextProvider>
  )
}

export default Navigation;
