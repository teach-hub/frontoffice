import { useMemo, useState, Suspense } from 'react';
import { useMutation, useLazyLoadQuery } from 'react-relay';

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

const NewSubmissionPageContainer = () => {
  const courseContext = useUserContext();

  const data = useLazyLoadQuery<ViewerOpenPullRequestsQuery>(AddSubmissionQuery, {
    courseId: courseContext.courseId || '',
  });
  const [commitMutation] = useMutation<CreateSubmissionMutationType>(
    CreateSubmissionMutation
  );

  const [repositoryName, setRepositoryName] = useState<null | string>(
    data.viewer?.repositories[0].name || null
  );

  const filteredPRs = useMemo(
    () =>
      data.viewer?.openPullRequests.filter(
        pullRequest => pullRequest.repositoryName === repositoryName
      ) || [],
    [data, repositoryName]
  );

  const [pullRequestUrl, setPullRequestUrl] = useState<null | string>(filteredPRs[0].url);
  const [assignmentId, setAssignmentId] = useState<null | string>(null);

  type FormValues = CreateSubmissionMutationType['variables'];

  const handleSubmit = (values: FormValues) => {
    console.log('Submitting', {
      assignmentId,
      pullRequestUrl,
      description: values.description,
    });

    if (courseContext.courseId && assignmentId && pullRequestUrl) {
      commitMutation({
        variables: {
          courseId: courseContext.courseId,
          assignmentId,
          pullRequestUrl,
          description: values.description,
        },
      });
    }
  };

  return (
    <PageDataContainer>
      <Heading margin="30px 0"> Nueva entrega </Heading>
      <Form
        initialValues={{
          assignmentId: '',
          courseId: '',
          pullRequestUrl: '',
          description: '',
        }}
        inputFields={[
          {
            inputComponent: () => (
              <Select onChange={changes => setAssignmentId(changes.currentTarget.value)}>
                {data.viewer?.course?.assignments.map(assignment => (
                  <option value={assignment.id}>{assignment.title}</option>
                ))}
              </Select>
            ),
            label: 'Trabajo practico',
            readError: () => false,
          },
          {
            inputComponent: () => (
              <Select
                onChange={changes => setRepositoryName(changes.currentTarget.value)}
              >
                {data.viewer?.repositories.map(repository => (
                  <option value={repository.name}>{repository.name}</option>
                ))}
              </Select>
            ),
            label: 'Repositorio',
            readError: () => false,
          },
          {
            inputComponent: () => (
              <Select
                onChange={changes => setPullRequestUrl(changes.currentTarget.value)}
              >
                {filteredPRs.map(pullRequest => (
                  <option value={pullRequest.url}>{pullRequest.title}</option>
                ))}
              </Select>
            ),
            label: 'Pull request',
            readError: () => false,
          },
          {
            inputComponent: (value, handleChange) => (
              <Input
                id={'description'}
                multiline
                value={value.description}
                onChange={handleChange}
              />
            ),
            label: 'Comentarios adicionales',
            readError: () => false,
          },
        ]}
        buttonsEnabled
        onSubmitForm={{ text: 'Enviar', onClick: handleSubmit }}
        validateForm={() => []}
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
