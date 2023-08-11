import React, { Suspense, useEffect, useState } from 'react';

import { MarkGithubIcon } from '@primer/octicons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import Navigation from 'components/Navigation';
import Table from 'components/Table';

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
import { Flex, Select, Stack } from '@chakra-ui/react';
import Link from 'components/Link';
import Tooltip from 'components/Tooltip';
import { theme } from 'theme';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';

const SubmissionsPage = ({
  courseContext,
  assignmentId,
}: {
  courseContext: FetchedContext;
  assignmentId: string;
}) => {
  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignmentId);

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId: selectedAssignmentId,
    courseId: courseContext.courseId,
  });

  const allAssignments = data.viewer?.course?.assignments || [];
  const assignmentsWithSubmissions =
    data.viewer?.course?.assignmentsWithSubmissions || [];
  const submissions = assignmentsWithSubmissions.flatMap(
    assignment => assignment?.submissions || []
  );
  const [filteredSubmissions, setFilteredSubmissions] = useState(
    submissions.filter(submission => submission?.assignmentId === selectedAssignmentId)
  );

  useEffect(() => {
    const assignmentsWithSubmissions =
      data.viewer?.course?.assignmentsWithSubmissions || [];
    const submissions = assignmentsWithSubmissions.flatMap(
      assignment => assignment?.submissions || []
    );
    setFilteredSubmissions(
      submissions.filter(submission => submission?.assignmentId === selectedAssignmentId)
    );
  }, [data]);

  return (
    <PageDataContainer>
      <Flex direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Heading>Entregas</Heading>
        <Select
          width={'fit-content'}
          borderColor={theme.colors.teachHub.black}
          value={selectedAssignmentId}
          onChange={changes => {
            setSelectedAssignmentId(changes.currentTarget.value);
          }}
        >
          {allAssignments.map(assignment => (
            <option value={assignment.id} key={assignment.id}>
              {assignment.title}
            </option>
          ))}
        </Select>
      </Flex>
      <Stack gap={'30px'} marginTop={'10px'} height={'75vh'}>
        <Table
          headers={['Alumno', 'Trabajo Práctico', 'Corrector', 'Estado', 'Nota', '']}
          rowOptions={filteredSubmissions.map(s => {
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
            const submissionAssignmentTitle = allAssignments.find(
              a => a.id === s.assignmentId
            )?.title;

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
                submissionAssignmentTitle,
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
      </Stack>
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
