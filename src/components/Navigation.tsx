import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';

import Box from '../components/Box';
import Button from '../components/Button';

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

  const handleGoToHome = () => navigate('/')
  const handleGoToProjects = () => navigate('/projects')
  const handleGoToProfile = () => navigate('/profile')

  return (
    <Stack shadow='lg' direction='row' style={NavigationBarStyle} >
      <Button h="100%" w="10%" colorScheme="blackAlpha">
        Realizar entrega
      </Button>
      <Button h="100%" w="10%" colorScheme="blackAlpha" onClick={handleGoToProjects}>
        TPS
      </Button>
      <Button h="100%" w="10%" colorScheme="blackAlpha" onClick={handleGoToProfile}>
        Mi perfil
      </Button>
      <Button h="100%" w="10%" colorScheme="blackAlpha" onClick={handleGoToHome}>
        Home
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
