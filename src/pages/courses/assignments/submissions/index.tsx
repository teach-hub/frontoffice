import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import Navigation from 'components/Navigation';
import Table from 'components/Table';

import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';

import SubmissionsQuery from 'graphql/AssignmentSubmissionsQuery';

import type { AssignmentSubmissionsQuery } from '__generated__/AssignmentSubmissionsQuery.graphql';
import {
  getGradeConfiguration,
  getSubmissionMissingStatusConfiguration,
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
import { useSubmissionContext } from 'hooks/useSubmissionsContext';
import useToast from 'hooks/useToast';

type UserRowData = {
  id: Optional<Nullable<string>>;
  name: Optional<Nullable<string>>;
  lastName: Optional<Nullable<string>>;
};

/* TODO: TH-170 may be group */
type SubmitterRowData = UserRowData;
type ReviewerRowData = UserRowData;

type SubmissionRowData = {
  id?: Optional<Nullable<string>>;
  grade?: Optional<Nullable<number>>;
  revisionRequested?: Nullable<boolean>;
  pullRequestUrl?: Optional<Nullable<string>>;
};

interface RowData {
  submitter: SubmitterRowData;
  reviewer?: ReviewerRowData;
  assignmentTitle: Optional<Nullable<string>>;
  submission?: SubmissionRowData;
}

const getRowUserName = (userRowData: UserRowData) =>
  `${userRowData.lastName}, ${userRowData.name}`;

const SubmissionsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get(Query.SubmissionAssignment);

  const { setSubmissionIds } = useSubmissionContext();

  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignmentId);

  /* TODO: TH-170 may be group */
  const [selectedStudentId, setSelectedStudentId] =
    useState<Optional<Nullable<string>>>(null);
  const [selectedReviewerId, setSelectedReviewerId] =
    useState<Optional<Nullable<string>>>(null);

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId: selectedAssignmentId,
    courseId: courseContext.courseId,
  });

  const allAssignments = data.viewer?.course?.assignments || [];

  const rowEnabledByFilters = ({
    submitterId,
    reviewerId,
  }: {
    submitterId?: string;
    reviewerId?: string;
  }) => {
    const validStudent = !selectedStudentId ? true : submitterId === selectedStudentId;
    const validReviewer = !selectedReviewerId ? true : reviewerId === selectedReviewerId;
    return validStudent && validReviewer;
  };

  const [rowDataList, setRowDataList] = useState<RowData[]>([]);
  const [rowsSubmitters, setRowsSubmitters] = useState<SubmitterRowData[]>([]);
  const [rowsReviewers, setRowsReviewers] = useState<ReviewerRowData[]>([]);

  useEffect(() => {
    const assignmentSubmissionsData =
      data.viewer?.course?.assignmentsWithSubmissions || [];
    const newSubmissions = assignmentSubmissionsData.flatMap(assignment =>
      (assignment?.submissions || []).filter(submission => {
        return rowEnabledByFilters({
          submitterId: submission.submitter.id,
          reviewerId: submission.reviewer?.reviewer?.id,
        });
      })
    );

    /* Set chosen submissions to context */
    setSubmissionIds(newSubmissions.map(submission => submission.id));

    const newRowData = newSubmissions.map((submission): RowData => {
      const submitter = submission.submitter;
      const reviewerUser = submission.reviewer?.reviewer;
      const review = submission?.review;
      const grade = review?.grade;
      const revisionRequested = review?.revisionRequested;
      const submissionAssignmentTitle = allAssignments.find(
        a => a.id === submission.assignmentId
      )?.title;

      return {
        submitter: {
          id: submitter.id,
          name: submitter.name,
          lastName: submitter.lastName,
        },
        assignmentTitle: submissionAssignmentTitle,
        reviewer: reviewerUser
          ? {
              id: reviewerUser.id,
              name: reviewerUser.name,
              lastName: reviewerUser.lastName,
            }
          : undefined,
        submission: submission.id
          ? {
              grade,
              revisionRequested,
              id: submission.id,
              pullRequestUrl: submission.pullRequestUrl,
            }
          : undefined,
      };
    });

    assignmentSubmissionsData.forEach(assignment =>
      (assignment?.nonExistentSubmissions || []).forEach(({ reviewer, submitter }) => {
        const reviewerUser = reviewer?.reviewer;
        if (
          rowEnabledByFilters({
            submitterId: submitter?.id,
            reviewerId: reviewerUser?.id,
          }) &&
          !assignment.isGroup
        ) {
          // TODO: TH-191 show group non existent submissions (change isGroup check)
          newRowData.push({
            submitter: {
              id: submitter.id,
              name: submitter.name,
              lastName: submitter.lastName,
            },
            assignmentTitle: assignment.title,
            reviewer: reviewerUser
              ? {
                  id: reviewerUser.id,
                  name: reviewerUser.name,
                  lastName: reviewerUser.lastName,
                }
              : undefined,
          });
        }
      })
    );

    setRowDataList(newRowData);

    setRowsReviewers(
      newRowData.map(row => row.reviewer).filter(Boolean) as ReviewerRowData[]
    );

    setRowsSubmitters(
      newRowData.map(row => row.submitter).filter(Boolean) as SubmitterRowData[]
    );
  }, [selectedStudentId, selectedReviewerId, data]);

  return (
    <PageDataContainer>
      <Flex direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
          <Heading>Entregas</Heading>
          {selectedStudentId && (
            <FilterBadge
              text={(() => {
                const selectedStudent = rowsSubmitters.find(
                  student => student.id === selectedStudentId
                );
                return 'Alumno/Grupo: '.concat(
                  selectedStudent ? getRowUserName(selectedStudent) : ''
                );
              })()}
              iconAriaLabel={'student-filter'}
              onClick={() => setSelectedStudentId(null)}
            />
          )}
          {selectedReviewerId && (
            <FilterBadge
              text={(() => {
                const selectedReviewer = rowsReviewers.find(
                  x => x?.id === selectedReviewerId
                );
                return 'Corrector: '.concat(
                  selectedReviewer ? getRowUserName(selectedReviewer) : ''
                );
              })()}
              iconAriaLabel={'reviewer-filter'}
              onClick={() => setSelectedReviewerId(null)}
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
          rowOptions={rowDataList.map(rowData => {
            const reviewStatusConfiguration = rowData.submission?.id
              ? getSubmissionReviewStatusConfiguration({
                  grade: rowData.submission?.grade,
                  revisionRequested: rowData.submission?.revisionRequested,
                })
              : getSubmissionMissingStatusConfiguration();
            const gradeConfiguration = getGradeConfiguration(rowData.submission?.grade);

            return {
              rowProps: {
                style: {
                  cursor: 'pointer',
                  transition: 'background-color 0.8s',
                },
                _hover: { bg: theme.colors.teachHub.gray },
                onClick: () =>
                  rowData.submission?.id
                    ? navigate(rowData.submission?.id)
                    : toast({
                        title: 'No existe entrega asociada',
                        description:
                          'Para acceder al detalle primero se debe realizar la entrega',
                        status: 'warning',
                      }),
              },
              content: [
                <Link // Link without redirect
                  onClick={event => {
                    event.stopPropagation(); // This prevents the click from propagating to the parent row
                    setSelectedStudentId(rowData.submitter.id);
                  }}
                >
                  {getRowUserName(rowData.submitter)}
                  {/*todo: TH-170 may be group - show column with checkbox if group and only display group name or student name?*/}
                </Link>,
                rowData.assignmentTitle,
                <Link // Link without redirect
                  onClick={event => {
                    event.stopPropagation(); // This prevents the click from propagating to the parent row
                    setSelectedReviewerId(rowData.reviewer?.id);
                  }}
                >
                  {rowData.reviewer ? getRowUserName(rowData.reviewer) : '-'}
                </Link>,
                <ReviewStatusBadge
                  reviewStatusConfiguration={reviewStatusConfiguration}
                />,
                <ReviewGradeBadge
                  grade={rowData.submission?.grade}
                  gradeConfiguration={gradeConfiguration}
                />,

                rowData.submission?.pullRequestUrl && (
                  <Stack direction={'row'}>
                    <Tooltip label={'Ir a repositorio'}>
                      <Link
                        href={getGithubRepoUrlFromPullRequestUrl(
                          rowData.submission?.pullRequestUrl
                        )}
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
                        href={rowData.submission?.pullRequestUrl}
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
                  </Stack>
                ),
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
