import { useState } from 'react';
import { useMutation, useLazyLoadQuery } from 'react-relay';

import AddSubmissionQueryDef from 'graphql/AddSubmissionQuery';
import CreateSubmissionMutation from 'graphql/CreateSubmissionMutation';

import Heading from 'components/Heading';
import Form from 'components/Form';
import Select from 'components/Select';
import Input from 'components/InputField';
import Text from 'components/Text';
import Alert from 'components/Alert';

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
// - Si el TP esta entregado --> error
// - Si el TP esta fuera de termino --> error
// - Si el TP esta antes de la fecha --> error
// - Si el tipo no tiene grupo --> error
//

type Course = NonNullable<NonNullable<AddSubmissionQuery$data['viewer']>['course']>;
type Group = Course['viewerGroupParticipants'][number];
type Assignment = NonNullable<NonNullable<Course['assignments']>[number]>;
type Repository = NonNullable<AddSubmissionQuery$data['viewer']>['repositories'][number];
type PullRequests = NonNullable<
  AddSubmissionQuery$data['viewer']
>['openPullRequests'][number];

function Content({
  availableRepositories,
  course,
  openPullRequests,
  targetAssignment,
}: {
  availableRepositories: readonly Repository[];
  course: Course;
  openPullRequests: readonly PullRequests[];
  targetAssignment?: Assignment;
}) {
  const { assignments, viewerGroupParticipants = [] } = course;

  const [commitMutation] = useMutation<CreateSubmissionMutationType>(
    CreateSubmissionMutation
  );

  const [group, setGroup] = useState<Group | null>(null);

  const handleSubmit = (values: FormValues) => {
    if (!course.id || !values.assignmentId || !values.pullRequestUrl) {
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
      {group && (
        <Text>
          Estás realizando una entrega en nombre del grupo: <b>{group.group.name}</b>
        </Text>
      )}
      <Form
        initialValues={{
          assignmentId: '',
          pullRequestUrl: '',
          description: '',
          repository: '',
        }}
        validateForm={values => {
          const errors: Record<string, string> = {};

          if (!values.pullRequestUrl) {
            errors['pullRequestUrl'] = 'Tenés que seleccionar un pull request abierto.';
          }

          const viewerAssignmentGroup = viewerGroupParticipants.find(
            gp => gp.assignmentId === values.assignmentId
          );

          if (!viewerAssignmentGroup) {
            errors['assignmentId'] = 'No sos parte de ningún grupo en este TP.';
          }

          return errors;
        }}
        inputFields={[
          {
            inputComponent: (values, _, setFieldValue) => (
              <Select
                onChange={changes => {
                  setFieldValue('assignmentId', changes.currentTarget.value);

                  const viewerAssignmentGroup = viewerGroupParticipants.find(
                    gp => gp.assignmentId === changes.currentTarget.value
                  );
                  setGroup(viewerAssignmentGroup ?? null);
                }}
                value={values.assignmentId}
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
                  isDisabled={!values.repository}
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
              <Input id={'description'} multiline onChange={handleChange} />
            ),
            label: 'Comentarios adicionales',
            readError: errors => errors.description as string,
          },
        ]}
        buttonsEnabled
        onSubmitForm={{ text: 'Enviar', onClick: handleSubmit }}
        // eslint-disable-next-line
        onCancelForm={{ text: 'Cancelar', onClick: () => {} }}
      />
    </>
  );
}

type NewSubmissionPageContainerProps = {
  courseId: string;
  assignmentId?: string;
};

export default function Container({
  courseId,
  assignmentId,
}: NewSubmissionPageContainerProps) {
  const data = useLazyLoadQuery<AddSubmissionQuery>(AddSubmissionQueryDef, {
    courseId,
  });
  if (!data?.viewer?.course?.assignments) {
    return null;
  }

  const {
    course: { assignments },
  } = data.viewer;

  // Si tenemos un asignment lo buscamos
  const targetAssignment = assignmentId
    ? assignments.find(assignment => assignment.id === assignmentId)
    : assignments[0];

  if (!targetAssignment) {
    return null;
  }

  return (
    <Content
      openPullRequests={data.viewer.openPullRequests}
      availableRepositories={data.viewer.repositories}
      course={data.viewer.course}
      targetAssignment={targetAssignment}
    />
  );
}
