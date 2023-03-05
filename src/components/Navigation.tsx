import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Switch } from '@chakra-ui/react';

import Box from '../components/Box';
import Button from '../components/Button';
import Text from '../components/Text';

const NavigationBarStyle = {
  background: 'white',
  position: 'fixed',
  justifyContent: 'right',
  padding: '25px',
  width: '100%',
  height: '10%',
} as const;

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);

  const handleGoToProfile = () => navigate('/profile')
  const handleGoToCourses = () => navigate('/courses')

  return (
    <Stack shadow='lg' direction='row' style={NavigationBarStyle} >
      <Box flex="1" alignItems="center" display="flex">
        <Switch isChecked={!!isTeacher} onChange={() => setIsTeacher(c => !c)} padding="10px" size='lg' />
        <Text padding="10px"><b>Soy profesor</b></Text>
      </Box>

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
    <>
      <NavigationBar />
      <Box style={{ width:"100%", height:"100%", zIndex: '-1', position: 'absolute', top: '105px' }}>
        {children}
      </Box>
    </>
  )
}

export default Navigation;
