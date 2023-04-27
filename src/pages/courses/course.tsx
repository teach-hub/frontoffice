import { Suspense, useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery, useFragment } from 'react-relay';

import { HStack, StatLabel, StatNumber, Flex, Stat, Stack } from '@chakra-ui/react';
// import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  CheckCircleIcon as CheckIcon,
  AlertIcon as CloseIcon,
  MortarBoardIcon,
  PersonIcon,
  MarkGithubIcon,
  TerminalIcon,
} from '@primer/octicons-react';

import Box from 'components/Box';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import Divider from 'components/Divider';
import StatCard from 'components/StatCard';

import CourseInfoQueryDef from 'graphql/CourseInfoQuery';

import type { CourseInfoQuery } from '__generated__/CourseInfoQuery.graphql';
import type { courseInfo$key } from '__generated__/courseInfo.graphql';

type Props = {
  findCourse: courseInfo$key;
};

const CourseStatistics = () => {
  const [currentIcon, setCurrentIcon] = useState(<CheckIcon size="large" />);

  return (
    <HStack padding="30px 0px" spacing="30px">
      <StatCard title="Profesores" stat="1" icon={<MortarBoardIcon size="large" />} />
      <StatCard title="Alumnos" stat="3" icon={<PersonIcon size="large" />} />
      <StatCard title="Enunciados" stat="3" icon={<TerminalIcon size="large" />} />
      {/* <StatCard title='Github' stat='3' icon={<MarkGithubIcon size="large" />} /> */}
      <Stat
        _hover={{ color: 'red' }}
        color="green"
        onMouseOver={() => setCurrentIcon(<CloseIcon size="large" />)}
        onMouseLeave={() => setCurrentIcon(<CheckIcon size="large" />)}
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'3px solid'}
        rounded={'lg'}
      >
        <Flex>
          <Box my={'auto'} alignContent={'center'}>
            <MarkGithubIcon size="large" />
            <StatLabel fontSize={'xl'} fontWeight={'medium'} isTruncated>
              Github
            </StatLabel>
          </Box>
          <Box padding="10px" flex="1" pl={{ base: 2, md: 4 }}>
            <StatNumber textAlign={'right'} fontSize={'5xl'} fontWeight={'bold'}>
              {currentIcon}
            </StatNumber>
          </Box>
        </Flex>
      </Stat>
    </HStack>
  );
};

const CourseUsers = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box onClick={() => navigate('users')}> Usuarios </Box>
      <Box onClick={() => navigate('assignments')}> Trabajos practicos </Box>
    </>
  );
};

const CourseInfo = ({ findCourse }: Props) => {
  const data = useFragment(
    graphql`
      fragment courseInfo on CourseType {
        id
        subject {
          name
        }
      }
    `,
    findCourse
  );

  return (
    <Box padding="0px 30px">
      <Heading>{data.subject.name}</Heading>
      <Divider orientation="horizontal" />
      <CourseStatistics />
    </Box>
  );
};

const CourseViewContainer = () => {
  const params = useParams();

  const data = useLazyLoadQuery<CourseInfoQuery>(CourseInfoQueryDef, {
    courseId: params.courseId || '',
  });

  if (!data.viewer || !data.viewer.findCourse) return null;

  return <CourseInfo findCourse={data.viewer.findCourse} />;
};

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <CourseViewContainer />
      </Navigation>
    </Suspense>
  );
};
