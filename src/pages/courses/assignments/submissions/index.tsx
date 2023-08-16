import React, { Suspense, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { Query } from 'queries';
import RepositoryIcon from 'icons/RepositoryIcon';
import PullRequestIcon from 'icons/PullRequestIcon';
import { getGithubRepoUrlFromPullRequestUrl } from 'utils/github';
import { Nullable, Optional } from 'types';
import { FilterBadge } from 'components/FilterBadge';

const SubmissionsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get(Query.SubmissionAssignment);

  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignmentId);

  const [selectedStudentId, setSelectedStudentId] =
    useState<Optional<Nullable<string>>>(null);

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId: selectedAssignmentId,
    courseId: courseContext.courseId,
  });

  const allAssignments = data.viewer?.course?.assignments || [];

  const filterSubmissions = () => {
    const assignmentsWithSubmissions =
      data.viewer?.course?.assignmentsWithSubmissions || [];
    const submissions = assignmentsWithSubmissions.flatMap(
      assignment => assignment?.submissions || []
    );
    if (!selectedStudentId) {
      return submissions;
    }
    return submissions.filter(
      submission => submission.submitter.id === selectedStudentId
    );
  };

  const studentsFromSubmissions = filterSubmissions()?.map(
    submission => submission.submitter
  );

  return (
    <PageDataContainer>
      <Flex direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
          <Heading>Entregas</Heading>
          {selectedStudentId && (
            <FilterBadge
              text={(() => {
                const selectedStudent = studentsFromSubmissions.find(
                  student => student.id === selectedStudentId
                );
                return selectedStudent
                  ? `${selectedStudent.name} ${selectedStudent.lastName} `
                  : '';
              })()}
              iconAriaLabel={'student-filter'}
              onClick={() => setSelectedStudentId(null)}
            />
          )}
        </Stack>
        <Select
          width={'fit-content'}
          borderColor={theme.colors.teachHub.black}
          placeholder={'- Sin filtrar -'} // Placeholder works as disabling the filter when chosen
          value={selectedAssignmentId || ''} // Set value to show selected option, or placeholder otherwise
          onChange={changes => {
            const newId = changes.currentTarget.value;
            setSelectedAssignmentId(newId);
            setSearchParams(params => {
              if (newId) params.set(Query.SubmissionAssignment, newId);
              else params.delete(Query.SubmissionAssignment);
              return params;
            });
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
          rowOptions={filterSubmissions().map(s => {
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
                onClick: () =>
                  navigate(`../assignments/${s.assignmentId}/submissions/${s.id}`),
              },
              content: [
                <Link // Link without redirect
                  onClick={event => {
                    event.stopPropagation(); // This prevents the click from propagating to the parent row
                    setSelectedStudentId(submitter.id);
                  }}
                >
                  {submitter.name} {submitter.lastName}
                  {/*todo: TH-170 may be group - show column with checkbox if group and only display group name or student name?*/}
                </Link>,
                submissionAssignmentTitle,
                reviewerUser ? `${reviewerUser.name} ${reviewerUser.lastName}` : '-',
                <ReviewStatusBadge
                  reviewStatusConfiguration={reviewStatusConfiguration}
                />,
                <ReviewGradeBadge
                  grade={grade}
                  gradeConfiguration={gradeConfiguration}
                />,
                <Stack direction={'row'}>
                  <Tooltip label={'Ir a repositorio'}>
                    <Link
                      href={getGithubRepoUrlFromPullRequestUrl(s.pullRequestUrl)}
                      isExternal
                      onClick={event => event.stopPropagation()} // Avoid row clic behaviour
                    >
                      <IconButton
                        variant={'ghost'}
                        aria-label="repository-link"
                        icon={<RepositoryIcon />}
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip label={'Ir a pull request'}>
                    <Link
                      href={s.pullRequestUrl}
                      isExternal
                      onClick={event => event.stopPropagation()} // Avoid row clic behaviour
                    >
                      <IconButton
                        variant={'ghost'}
                        aria-label="pull-request-link"
                        icon={<PullRequestIcon />}
                      />
                    </Link>
                  </Tooltip>
                </Stack>,
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

  if (!courseContext.courseId) {
    return null;
  }

  return <SubmissionsPage courseContext={courseContext} />;
};

export default () => {
  return (
    <Navigation>
      <Suspense>
        <SubmissionsPageContainer />
      </Suspense>
    </Navigation>
  );
};
