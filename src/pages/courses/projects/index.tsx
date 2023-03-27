import { Suspense } from 'react';

import { IconButton, Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import Navigation from 'components/Navigation';
import Box from 'components/Box';
import Card from 'components/Card';

const ProjectOverviewCard = () => {
  return (
    <Card>
      <Box>
        Testing
      </Box>
    </Card>
  )
}

const ProjectsPage = () => {
  const fakeDummyData = ['testing'];

  return (
    <>
      {fakeDummyData.map(data => <ProjectOverviewCard /> )}
    </>
  )
}

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <ProjectsPage />
      </Navigation>
    </Suspense>
  )
}
