import { MouseEvent, Suspense, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useFragment, useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

import { Card, CardBody, IconButton, Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import Text from '../../components/Text';
import Heading from '../../components/Heading';
import Box from '../../components/Box';
import Navigation from '../../components/Navigation';

import { useUserContext } from '../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';


const Fragment = graphql`
  fragment usersFragment on CourseType {
    users {
      id
      name
      lastName
      file
    }
    name
  }
`;

const UsersContainer = () => {
  const { courseId } = useParams();
  return <></>
}

export default () => {

  return (
    <Navigation>
      <Suspense fallback={<div>Cargando...</div>}>
        <UsersContainer />
      </Suspense>
    </Navigation>
  )
}
