import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';
import { Stack, Switch } from '@chakra-ui/react';
import { useLazyLoadQuery } from 'react-relay';

import Box from '../components/Box';
import Button from '../components/Button';
import Text from '../components/Text';
import Heading from '../components/Heading';

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


const NavigationTitle = () => {
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
      <Heading size="lg">{pageTitle}</Heading>
    </Box>
  )
}

const NavigationBar = ({  }) => {
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);

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
      <NavigationTitle />
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
  // const data = useLazyLoadQuery(
  //   graphql`
  //     query NavigationQuery {
  //       viewer {
  //         userId
  //         name
  //       }
  //     }
  //   `,
  //   {}
  // )

  return (
    <>
      <NavigationBar />
      <Box style={{ width:"100%", height:"100%", zIndex: '-1', position: 'absolute', top: '105px' }}>
        {children}
      </Box>
    </>
  )
}

export default Navigation;
