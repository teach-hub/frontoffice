import { ChangeEvent, Suspense, useState } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useMutation } from 'react-relay';

import {
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AlertIcon,
  AlertIcon as CloseIcon,
  CheckCircleIcon as CheckIcon,
  MarkGithubIcon,
  MortarBoardIcon,
  PersonIcon,
  TerminalIcon,
} from '@primer/octicons-react';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import Divider from 'components/Divider';
import StatCard from 'components/StatCard';

import CourseInfoQueryDef from 'graphql/CourseInfoQuery';

import type {
  CourseInfoQuery,
  CourseInfoQuery$data,
} from '__generated__/CourseInfoQuery.graphql';
import PageDataContainer from 'components/PageDataContainer';
import Button from '../../components/Button';
import {
  CourseSetOrganizationMutation,
  CourseSetOrganizationMutation$data,
} from '../../__generated__/CourseSetOrganizationMutation.graphql';
import CourseSetOrganizationMutationDef from '../../graphql/CourseSetOrganizationMutation';
import useToast from '../../hooks/useToast';
import Box from '../../components/Box';

type Props = {
  course: NonNullable<NonNullable<CourseInfoQuery$data['viewer']>['findCourse']>;
  availableOrganizations: NonNullable<
    CourseInfoQuery$data['viewer']
  >['availableOrganizations'];
};

const CourseStatistics = ({ course, availableOrganizations }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultOrganizationName = () => course.organization || '';
  const [organizationName, setOrganizationName] = useState(defaultOrganizationName());
  const [commitCourseSetOrganization, isCourseSetOrganizationInFlight] =
    useMutation<CourseSetOrganizationMutation>(CourseSetOrganizationMutationDef);

  const handleOrganizationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrganizationName(event.target.value);
  };

  const handleGoToTeachers = () => {
    const search = `?${createSearchParams({ role: 'teacher' })}`;
    navigate({ pathname: 'users', search });
  };

  const handleGoToStudents = () => {
    const search = `?${createSearchParams({ role: 'student' })}`;
    navigate({ pathname: 'users', search });
  };

  const errored = () => course.organization === '' || course.organization === null;

  const organizationNames = availableOrganizations?.names || [];

  const handleOrganizationChangeCancel = () => {
    setOrganizationName(defaultOrganizationName());
    onClose();
  };

  const handleOrganizationChangeSubmit = () => {
    commitCourseSetOrganization({
      variables: {
        courseId: course.id,
        organizationName,
      },
      onCompleted: (response: CourseSetOrganizationMutation$data, errors) => {
        const data = response.setOrganization;
        if (!errors?.length && data) {
          toast({
            title: 'Organización actualizada!',
            status: 'info',
          });

          /* Update current course organization avoiding to reload */
          course = {
            ...course,
            organization: data.organization,
          };
        } else {
          const errorMessage = errors ? errors[0].message : null;
          toast({
            title: 'Error',
            description:
              `No se pudo configurar la organización` + errorMessage
                ? `: ${errorMessage}`
                : '',
            status: 'error',
          });
        }
        onClose();
      },
    });
  };

  return (
    <HStack margin="20px 0px" spacing="30px">
      <StatCard
        onClick={handleGoToTeachers}
        title="Profesores"
        stat={String(course.teachersCount)}
        icon={<MortarBoardIcon size="large" />}
      />
      <StatCard
        onClick={handleGoToStudents}
        title="Alumnos"
        stat={String(course.studentsCount)}
        icon={<PersonIcon size="large" />}
      />
      <StatCard
        onClick={() => navigate('assignments')}
        title="Trabajos Prácticos"
        stat={String(course.assignments.length)}
        icon={<TerminalIcon size="large" />}
      />
      <StatCard
        onClick={() => onOpen()}
        title={'Organizacion de GitHub'}
        stat={!errored() ? <CheckIcon size="large" /> : <CloseIcon size="large" />}
        icon={<MarkGithubIcon size="large" />}
        color={!errored() ? 'green' : 'red'}
        border={'3px solid'}
        tooltipLabel={organizationName}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configurar organización de GitHub</ModalHeader>
          <ModalBody>
            <Flex direction="column" gap="60px">
              {organizationNames.length === 0 ? (
                <Flex
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Box paddingBottom={'20px'}>
                    <AlertIcon size={'large'} />
                  </Box>
                  <Text>{'No hay organizaciones disponibles.'}</Text>
                  <Text>{'Revisar accesos otorgados en GitHub.'}</Text>
                </Flex>
              ) : (
                <Select
                  placeholder="Selecciona una opción"
                  value={organizationName}
                  onChange={handleOrganizationChange}
                >
                  {organizationNames.map(org => (
                    <option value={org} key={org}>
                      {org}
                    </option>
                  ))}
                </Select>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter gap={'30px'}>
            <Button onClick={handleOrganizationChangeCancel} variant={'ghost'}>
              {'Cancelar'}
            </Button>
            <Button onClick={handleOrganizationChangeSubmit}>{'Guardar'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

const CourseViewContainer = () => {
  const { courseId } = useParams();

  const data = useLazyLoadQuery<CourseInfoQuery>(CourseInfoQueryDef, {
    courseId: courseId || '',
  });

  if (!data.viewer || !data.viewer.findCourse) {
    return null;
  }

  const course = data.viewer.findCourse;
  const availableOrganizations = data.viewer.availableOrganizations;

  return (
    <PageDataContainer>
      <Heading>
        {course.name} - {course.subject.name}
      </Heading>
      <Divider orientation="horizontal" />
      <CourseStatistics course={course} availableOrganizations={availableOrganizations} />
    </PageDataContainer>
  );
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
