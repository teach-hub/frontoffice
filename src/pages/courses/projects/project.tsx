import { Suspense } from 'react';

import Navigation from 'components/Navigation';
import Box from 'components/Box';

const ProjectPage = () => {
  return (
    <Box>Vista trabajo practico</Box>
  )
}

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <ProjectPage />
      </Navigation>
    </Suspense>
  )
}
