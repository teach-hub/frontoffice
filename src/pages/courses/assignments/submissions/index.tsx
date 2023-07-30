import React, { Suspense } from 'react';

import { MarkGithubIcon } from '@primer/octicons-react';
import { Link as RRLink, useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import Table from 'components/Table';
import Box from 'components/Box';

import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';

import SubmissionsQuery from 'graphql/AssignmentSubmissionsQuery';

import type { AssignmentSubmissionsQuery } from '__generated__/AssignmentSubmissionsQuery.graphql';
import {
  getGradeConfiguration,
  getSubmissionReviewStatusConfiguration,
} from 'app/submissions';
import { ReviewStatusBadge } from 'components/review/ReviewStatusBadge';
import { ReviewGradeBadge } from 'components/review/ReviewGradeBadge';
import IconButton from 'components/IconButton';
import { Flex } from '@chakra-ui/react';
import Link from 'components/Link';
import Tooltip from 'components/Tooltip';
import { theme } from 'theme';

const SubmissionsPage = ({
  courseContext,
  assignmentId,
}: {
  courseContext: FetchedContext;
  assignmentId: string;
}) => {
  const navigate = useNavigate();

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId,
    courseId: courseContext.courseId,
  });

  const submissions = data.viewer?.course?.assignment?.submissions || [];

  const VIEW_ASSIGNMENT_LINK = `..`;

  return (
    <PageDataContainer>
      <Heading>
        Entregas |{' '}
        <Link
          as={RRLink}
          to={VIEW_ASSIGNMENT_LINK}
          isExternal
          color={theme.colors.teachHub.primaryLight}
        >
          {data.viewer?.course?.assignment?.title}
        </Link>
      </Heading>
      <Box padding="30px 0px">
        <Table
          headers={['Alumno', 'Corrector', 'Estado', 'Nota', '']}
          rowOptions={submissions.map(s => {
            const review = s?.review;
            const grade = review?.grade;
            const revisionRequested = review?.revisionRequested;

            const reviewStatusConfiguration = getSubmissionReviewStatusConfiguration({
              grade: grade,
              revisionRequested,
            });
            const gradeConfiguration = getGradeConfiguration(grade);

            const submitter = s.submitter;
            const reviewerUser = s.reviewer?.reviewer;

            return {
              rowProps: {
                style: {
                  cursor: 'pointer',
                  transition: 'background-color 0.8s',
                },
                _hover: { bg: theme.colors.teachHub.gray },
                onClick: () => navigate(s.id),
              },
              content: [
                `${submitter.name} ${submitter.lastName}`, // todo: TH-170 may be group
                reviewerUser ? `${reviewerUser.name} ${reviewerUser.lastName}` : '-',
                <ReviewStatusBadge
                  reviewStatusConfiguration={reviewStatusConfiguration}
                />,
                <ReviewGradeBadge
                  grade={grade}
                  gradeConfiguration={gradeConfiguration}
                />,
                <Flex>
                  <Tooltip label={'Ir a pull request'}>
                    <Link
                      href={s.pullRequestUrl}
                      isExternal
                      onClick={event => event.stopPropagation()} // Avoid row clic behaviour
                    >
                      <IconButton
                        variant={'ghost'}
                        aria-label="pull-request-link"
                        icon={<MarkGithubIcon size="medium" />}
                      />
                    </Link>
                  </Tooltip>
                </Flex>,
              ],
            };
          })}
        />
      </Box>
    </PageDataContainer>
  );
};

const SubmissionsPageContainer = () => {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();

  if (!assignmentId || !courseContext.courseId) {
    return null;
  }

  return <SubmissionsPage courseContext={courseContext} assignmentId={assignmentId} />;
};

// Pantalla de entregas de un TP en particular.
export default () => {
  return (
    <Navigation>
      <Suspense>
        <SubmissionsPageContainer />
      </Suspense>
    </Navigation>
  );
};
