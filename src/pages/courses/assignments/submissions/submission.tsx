import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';

import { useUserContext } from 'hooks/useUserCourseContext';

import SubmissionQueryDef from 'graphql/SubmissionQuery';

import type { SubmissionQuery } from '__generated__/SubmissionQuery.graphql';

const SubmissionPage = () => {
  const courseContext = useUserContext();
  const { assignmentId, submissionId } = useParams();

  if (!assignmentId || !courseContext.courseId || !submissionId) {
    return null;
  }

  console.log(assignmentId, submissionId);

  const data = useLazyLoadQuery<SubmissionQuery>(SubmissionQueryDef, {
    courseId: courseContext.courseId,
    assignmentId,
    submissionId,
  });

  const submission = data.viewer?.course?.assignment?.submission;

  if (!submission) {
    return null;
  }

  return (
    <PageDataContainer>
      <Heading>Entrega</Heading>
      <Heading size="sm">{submission.description}</Heading>
      <Heading size="sm">{submission.submittedAt}</Heading>
    </PageDataContainer>
  );
};

// Pantalla de entregas de un TP en particular.
export default () => {
  return (
    <Navigation>
      <Suspense>
        <SubmissionPage />
      </Suspense>
    </Navigation>
  );
};
