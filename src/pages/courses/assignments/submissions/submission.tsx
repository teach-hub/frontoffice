import { Suspense } from 'react';

import { KebabHorizontalIcon } from '@primer/octicons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import Table from 'components/Table';
import Button from 'components/Button';
import Box from 'components/Box';

import { useUserContext } from 'hooks/useUserCourseContext';

import SubmissionQueryDef from 'graphql/SubmissionQuery';
import type { SubmissionQuery } from '__generated__/SubmissionQuery.graphql';

const SubmissionPage = () => {
  const courseContext = useUserContext();
  const { assignmentId, submissionId } = useParams();
  const navigate = useNavigate();

  if (!assignmentId || !courseContext.courseId || !submissionId) {
    return null;
  }

  const data = useLazyLoadQuery<SubmissionQuery>(SubmissionQueryDef, {
    assignmentId,
    courseId: courseContext.courseId,
    submissionId,
  });

  console.log(data);

  return (
    <PageDataContainer>
      <Heading>Entrega</Heading>
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
