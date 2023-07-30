import { useMemo, useState, Suspense } from 'react';
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

import type { AddSubmissionQuery } from '__generated__/AddSubmissionQuery.graphql';
import type { CreateSubmissionMutation as CreateSubmissionMutationType } from '__generated__/CreateSubmissionMutation.graphql';

type FormValues = Omit<CreateSubmissionMutationType['variables'], 'courseId'> & {
  repository: string;
};

// TODO(Tomas).
// - Si el TP esta entregado no deberia poder acceder a esta pagina.
// - Si el tipo no tiene grupo y el TP es grupal tampoco deberia poder entregar.

const NewSubmissionPageContainer = () => {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();

  const data = useLazyLoadQuery<AddSubmissionQuery>(AddSubmissionQueryDef, {
    courseId: courseContext.courseId || '',
  });
  const [commitMutation] = useMutation<CreateSubmissionMutationType>(
    CreateSubmissionMutation
  );

  if (!data?.viewer?.course?.assignments) {
    return null;
  }

  const {
    course: { assignments, viewerGroupParticipants = [] },
  } = data.viewer;
  const targetAssignment = assignments.find(assignment => assignment.id === assignmentId);

  if (!targetAssignment) {
    return null;
  }

  const { isGroup } = targetAssignment;

  const viewerAssignmentGroup = viewerGroupParticipants.find(
    gp => gp.assignmentId === assignmentId
  );
  const formDisabled = !!isGroup && !viewerAssignmentGroup;

  const handleSubmit = (values: FormValues) => {
    if (!courseContext.courseId || !assignmentId || !values.pullRequestUrl) {
      return;
    }

    commitMutation({
      variables: {
        courseId: courseContext.courseId,
        assignmentId: values.assignmentId,
        pullRequestUrl: values.pullRequestUrl,
        description: values.description,
      },
    });
  };

  return (
    <PageDataContainer gap="30px">
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
          assignmentId: assignmentId || '',
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
                {data.viewer?.repositories.map(repository => (
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
                data.viewer?.openPullRequests.filter(
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
    </PageDataContainer>
  );
};

export default () => {
  return (
    <Navigation>
      <Suspense fallback={'Cargando datos'}>
        <NewSubmissionPageContainer />
      </Suspense>
    </Navigation>
  );
};
