import { useMemo, useState, Suspense } from 'react';
import { useMutation, useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';

import AddSubmissionQuery from 'graphql/ViewerOpenPullRequests';
import CreateSubmissionMutation from 'graphql/CreateSubmissionMutation';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import Form from 'components/Form';
import Select from 'components/Select';
import Input from 'components/InputField';

import { useUserContext } from 'hooks/useUserCourseContext';

import type { ViewerOpenPullRequestsQuery } from '__generated__/ViewerOpenPullRequestsQuery.graphql';
import type { CreateSubmissionMutation as CreateSubmissionMutationType } from '__generated__/CreateSubmissionMutation.graphql';

type FormValues = Omit<CreateSubmissionMutationType['variables'], 'courseId'> & {
  repository: string;
};

const NewSubmissionPageContainer = () => {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();

  const data = useLazyLoadQuery<ViewerOpenPullRequestsQuery>(AddSubmissionQuery, {
    courseId: courseContext.courseId || '',
  });
  const [commitMutation] = useMutation<CreateSubmissionMutationType>(
    CreateSubmissionMutation
  );

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
    <PageDataContainer>
      <Heading margin="30px 0"> Nueva entrega </Heading>
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
            inputComponent: (values, handleChange, setFieldValue) => (
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
                {data.viewer?.course?.assignments.map(assignment => (
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
            inputComponent: (values, handleChange) => (
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
