import { useState, Suspense } from 'react';
import { useMutation, useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';

import AddSubmissionQueryDef from 'graphql/AddSubmissionQuery';
import CreateSubmissionMutation from 'graphql/CreateSubmissionMutation';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import Form from 'components/Form';
import Select from 'components/Select';
import Input from 'components/InputField';
import Text from 'components/Text';
import Alert from 'components/Alert';

import { useUserContext } from 'hooks/useUserCourseContext';

import type {
  AddSubmissionQuery,
  AddSubmissionQuery$data,
} from '__generated__/AddSubmissionQuery.graphql';
import type { CreateSubmissionMutation as CreateSubmissionMutationType } from '__generated__/CreateSubmissionMutation.graphql';

type FormValues = Omit<CreateSubmissionMutationType['variables'], 'courseId'> & {
  repository: string;
};

// TODO(Tomas).
// - Si el TP esta entregado no deberia poder acceder a esta pagina.
// - Si el tipo no tiene grupo y el TP es grupal tampoco deberia poder entregar.

type Course = NonNullable<NonNullable<AddSubmissionQuery$data['viewer']>['course']>;
type Assignment = NonNullable<NonNullable<Course['assignments']>[number]>;
type Repository = NonNullable<AddSubmissionQuery$data['viewer']>['repositories'][number];
type PullRequests = NonNullable<
  AddSubmissionQuery$data['viewer']
>['openPullRequests'][number];

function PageContent({
  availableRepositories,
  course,
  targetAssignment,
  openPullRequests,
}: {
  availableRepositories: readonly Repository[];
  course: Course;
  targetAssignment: Assignment;
  openPullRequests: readonly PullRequests[];
}) {
  const { assignments, viewerGroupParticipants = [] } = course;
  const { isGroup } = targetAssignment;

  const [commitMutation] = useMutation<CreateSubmissionMutationType>(
    CreateSubmissionMutation
  );

  const viewerAssignmentGroup = viewerGroupParticipants.find(
    gp => gp.assignmentId === targetAssignment.id
  );
  const formDisabled = !!isGroup && !viewerAssignmentGroup;

  const handleSubmit = (values: FormValues) => {
    if (!course.id || !targetAssignment.id || !values.pullRequestUrl) {
      return;
    }

    commitMutation({
      variables: {
        courseId: course.id,
        assignmentId: values.assignmentId,
        pullRequestUrl: values.pullRequestUrl,
        description: values.description,
      },
    });
  };

  return (
    <>
      <Heading> Nueva entrega </Heading>
      {isGroup && viewerAssignmentGroup && (
        <Text>
          Estás realizando una entrega en nombre del grupo:{' '}
          <b>{viewerAssignmentGroup.group.name}</b>
        </Text>
      )}
      {isGroup && !viewerAssignmentGroup && (
        <Alert showIcon status="error">
          No estás en un grupo para este trabajo práctico.
        </Alert>
      )}
      <Form
        initialValues={{
          assignmentId: targetAssignment.id,
          pullRequestUrl: '',
          description: '',
          repository: '',
        }}
        validateForm={values => {
          const errors: Record<string, string> = {};

          if (!values.pullRequestUrl) {
            errors['pullRequestUrl'] = 'Tenes que seleccionar un pull request abierto';
          }

          return errors;
        }}
        inputFields={[
          {
            inputComponent: (values, _, setFieldValue) => (
              <Select
                onChange={changes =>
                  setFieldValue('assignmentId', changes.currentTarget.value)
                }
                value={values.assignmentId}
                isDisabled
              >
                <option disabled value="">
                  Elegi un TP
                </option>
                {assignments.map(assignment => (
                  <option value={assignment.id}>{assignment.title}</option>
                ))}
              </Select>
            ),
            label: 'Trabajo practico',
            readError: errors => errors.assignmentId as string,
          },
          {
            inputComponent: (values, _, setFieldValue) => (
              <Select
                onChange={changes => {
                  setFieldValue('repository', changes.currentTarget.value);
                  setFieldValue('pullRequestUrl', '');
                }}
                value={values.repository}
                isDisabled={formDisabled}
              >
                <option disabled value="">
                  Elegi un repositorio
                </option>
                {availableRepositories.map(repository => (
                  <option value={repository.name}>{repository.name}</option>
                ))}
              </Select>
            ),
            label: 'Repositorio',
            readError: errors => errors.repository as string,
          },
          {
            inputComponent: (values, _, setFieldValue) => {
              const availablePullRequests =
                openPullRequests.filter(
                  pullRequest => pullRequest.repositoryName === values.repository
                ) || [];

              return (
                <Select
                  onChange={changes =>
                    setFieldValue('pullRequestUrl', changes.currentTarget.value)
                  }
                  value={values.pullRequestUrl}
                  isDisabled={!values.repository || formDisabled}
                >
                  <option disabled value="">
                    Elegi un pull request abierto
                  </option>
                  {availablePullRequests.map(pullRequest => (
                    <option value={pullRequest.url}>{pullRequest.title}</option>
                  ))}
                </Select>
              );
            },
            label: 'Pull request',
            readError: errors => errors.pullRequestUrl as string,
          },
          {
            inputComponent: (_, handleChange) => (
              <Input
                id={'description'}
                isDisabled={formDisabled}
                multiline
                onChange={handleChange}
              />
            ),
            label: 'Comentarios adicionales',
            readError: errors => errors.description as string,
          },
        ]}
        buttonsEnabled={!formDisabled}
        onSubmitForm={{ text: 'Enviar', onClick: handleSubmit }}
        // eslint-disable-next-line
        onCancelForm={{ text: 'Cancelar', onClick: () => {} }}
      />
    </>
  );
}

type NewSubmissionPageContainerProps = {
  courseId: string;
  assignmentId: string;
};

const NewSubmissionPageContainer = ({
  courseId,
  assignmentId,
}: NewSubmissionPageContainerProps) => {
  const data = useLazyLoadQuery<AddSubmissionQuery>(AddSubmissionQueryDef, {
    courseId,
  });
  if (!data?.viewer?.course?.assignments) {
    return null;
  }

  const {
    course: { assignments },
  } = data.viewer;
  const targetAssignment = assignments.find(assignment => assignment.id === assignmentId);

  if (!targetAssignment) {
    return null;
  }

  return (
    <PageContent
      openPullRequests={data.viewer.openPullRequests}
      availableRepositories={data.viewer.repositories}
      course={data.viewer.course}
      targetAssignment={targetAssignment}
    />
  );
};

function PageContainer() {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();

  if (!courseContext.courseId || !assignmentId) {
    return null;
  }

  return (
    <PageDataContainer gap="30px">
      <Suspense fallback={'Cargando datos'}>
        <NewSubmissionPageContainer
          courseId={courseContext.courseId}
          assignmentId={assignmentId}
        />
      </Suspense>
    </PageDataContainer>
  );
}

export default () => {
  return (
    <Navigation>
      <PageContainer />
    </Navigation>
  );
};
