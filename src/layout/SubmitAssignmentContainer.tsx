import { useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import useToast from 'hooks/useToast';

import { buildAssignmentRoute } from 'routes';

import AddSubmissionQueryDef from 'graphql/AddSubmissionQuery';
import CreateSubmissionMutation from 'graphql/CreateSubmissionMutation';

import Heading from 'components/Heading';
import Form from 'components/Form';
import Select from 'components/Select';
import Text from 'components/Text';

import type {
  AddSubmissionQuery,
  AddSubmissionQuery$data,
} from '__generated__/AddSubmissionQuery.graphql';
import type { CreateSubmissionMutation as CreateSubmissionMutationType } from '__generated__/CreateSubmissionMutation.graphql';
import Spinner from 'components/Spinner';

type FormValues = Omit<CreateSubmissionMutationType['variables'], 'courseId'> & {
  repository: string;
};

type Course = NonNullable<NonNullable<AddSubmissionQuery$data['viewer']>['course']>;
type Group = Course['viewerGroupParticipants'][number];
type Assignment = NonNullable<NonNullable<Course['assignments']>[number]>;
type Repository = Course['viewerRepositories'][number];
type PullRequests = NonNullable<
  AddSubmissionQuery$data['viewer']
>['openPullRequests'][number];

function Content({
  availableRepositories,
  course,
  openPullRequests,
  targetAssignment,
  shouldLockAssignment,
}: {
  availableRepositories: readonly Repository[];
  course: Course;
  openPullRequests: readonly PullRequests[];
  shouldLockAssignment: boolean;
  targetAssignment?: Assignment;
}) {
  const { assignments, viewerGroupParticipants = [] } = course;

  const navigate = useNavigate();
  const toast = useToast();

  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [commitMutation] = useMutation<CreateSubmissionMutationType>(
    CreateSubmissionMutation
  );

  const [group, setGroup] = useState<Group | null>(
    targetAssignment
      ? viewerGroupParticipants.find(
          gp => gp.group.assignmentId === targetAssignment.id
        ) ?? null
      : null
  );
  const [reviewer, setReviewer] = useState<
    NonNullable<Assignment['viewerReviewer']>['reviewer'] | null
  >(targetAssignment ? targetAssignment.viewerReviewer?.reviewer ?? null : null);

  const handleSubmit = (values: FormValues) => {
    if (!course.id || !values.assignmentId || !values.pullRequestUrl) {
      return;
    }

    setShowSpinner(true);
    commitMutation({
      variables: {
        courseId: course.id,
        assignmentId: values.assignmentId,
        pullRequestUrl: values.pullRequestUrl,
      },
      onCompleted: (_, errors) => {
        setShowSpinner(false);
        if (errors && errors.length) {
          toast({
            title: 'Entrega fallida',
            description: 'No pudimos procesar tu entrega',
            status: 'error',
          });
        } else {
          toast({
            title: 'Entrega creada',
            description: 'Entrega realizada con exito',
            status: 'success',
          });
        }
        navigate(buildAssignmentRoute(course.id, values.assignmentId));
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
      <Spinner
        isOpen={showSpinner}
        onClose={() => {
          setShowSpinner(false);
        }}
      />
      <Heading> Nueva entrega </Heading>
      <Text>
        {groupText} {reviewerText}
      </Text>
      <Form
        initialValues={{
          assignmentId: targetAssignment ? targetAssignment.id : '',
          pullRequestUrl: '',
          repository: '',
        }}
        validateForm={values => {
          const errors: Record<string, string> = {};

          if (!values.pullRequestUrl) {
            errors['pullRequestUrl'] = 'Tenés que seleccionar un pull request abierto.';
          }

          const viewerAssignmentGroup = viewerGroupParticipants.find(
            gp => gp.group.assignmentId === values.assignmentId
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

          if (target && target.viewerSubmission) {
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
                isDisabled={shouldLockAssignment}
                onChange={changes => {
                  setFieldValue('assignmentId', changes.currentTarget.value);

                  const viewerAssignmentGroup = viewerGroupParticipants.find(
                    gp => gp.group.assignmentId === changes.currentTarget.value
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
        ]}
        buttonsEnabled
        onSubmitForm={{ text: 'Enviar', onClick: handleSubmit }}
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
      availableRepositories={data.viewer.course.viewerRepositories}
      course={data.viewer.course}
      targetAssignment={targetAssignment}
      shouldLockAssignment={!!assignmentId}
    />
  );
}
