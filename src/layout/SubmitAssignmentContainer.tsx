import { useState } from 'react';
import { useMutation, useLazyLoadQuery } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import AddSubmissionQueryDef from 'graphql/AddSubmissionQuery';
import CreateSubmissionMutation from 'graphql/CreateSubmissionMutation';

import Heading from 'components/Heading';
import Form from 'components/Form';
import Select from 'components/Select';
import Input from 'components/InputField';
import Text from 'components/Text';

import type {
  AddSubmissionQuery,
  AddSubmissionQuery$data,
} from '__generated__/AddSubmissionQuery.graphql';
import type { CreateSubmissionMutation as CreateSubmissionMutationType } from '__generated__/CreateSubmissionMutation.graphql';

type FormValues = Omit<CreateSubmissionMutationType['variables'], 'courseId'> & {
  repository: string;
};

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

  const navigate = useNavigate();

  const [commitMutation] = useMutation<CreateSubmissionMutationType>(
    CreateSubmissionMutation
  );

  const [group, setGroup] = useState<Group | null>(
    targetAssignment
      ? viewerGroupParticipants.find(gp => gp.assignmentId === targetAssignment.id) ??
          null
      : null
  );
  const [reviewer, setReviewer] = useState<
    NonNullable<Assignment['viewerReviewer']>['reviewer'] | null
  >(targetAssignment ? targetAssignment.viewerReviewer?.reviewer ?? null : null);

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

  const groupText = group ? (
    <>
      Estás realizando una entrega en nombre del grupo: <b>{group.group.name}</b>.
    </>
  ) : (
    'Estás realizando una entrega individual.'
  );

  const reviewerText = reviewer ? (
    <>
      Tu entrega va a ser corregida por:{' '}
      <b>
        {reviewer.name} {reviewer.lastName}
      </b>
    </>
  ) : (
    'Aún no tenés un corrector asignado'
  );

  return (
    <>
      <Heading> Nueva entrega </Heading>
      <Text>
        {groupText} {reviewerText}
      </Text>
      <Form
        initialValues={{
          assignmentId: targetAssignment ? targetAssignment.id : '',
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

          const target = assignments.find(
            assignment => assignment.id === values.assignmentId
          );

          if (!target) {
            errors['assignmentId'] = 'No pudimos encontrar el TP seleccionado.';
          }

          if (target?.isGroup && !viewerAssignmentGroup) {
            errors['assignmentId'] = 'No sos parte de ningún grupo en este TP.';
          }

          if (target && target.viewerAlreadyMadeSubmission) {
            errors['assignmentId'] = 'Ya existe una entrega realizada para este TP.';
          }

          if (target && !target.isOpenForSubmissions) {
            errors['assignmentId'] = 'Las entregas para este TP ya están cerradas.';
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

                  const viewerReviewerUser = assignments.find(
                    assignment => assignment.id === changes.currentTarget.value
                  )?.viewerReviewer?.reviewer;
                  setReviewer(viewerReviewerUser ?? null);
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
        onCancelForm={{ text: 'Cancelar', onClick: () => navigate('../..') }}
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

  return (
    <Content
      openPullRequests={data.viewer.openPullRequests}
      availableRepositories={data.viewer.repositories}
      course={data.viewer.course}
      targetAssignment={targetAssignment}
    />
  );
}
