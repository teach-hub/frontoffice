import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import Navigation from 'components/Navigation';
import Table from 'components/Table';

import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';

import SubmissionsQuery from 'graphql/AssignmentSubmissionsQuery';

import type {
  AssignmentSubmissionsQuery,
  AssignmentSubmissionsQuery$data,
} from '__generated__/AssignmentSubmissionsQuery.graphql';
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

type SubjectRowData = {
  id: Optional<Nullable<string>>;
  name: Optional<Nullable<string>>;
};

/* TODO: TH-170 may be group */
type SubmitterRowData = SubjectRowData;
type ReviewerRowData = SubjectRowData;

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

type SubmissionType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<AssignmentSubmissionsQuery$data['viewer']>['course']
    >['assignmentsWithSubmissions'][number]
  >['submissions'][number]
>;

type SubmitterType = NonNullable<SubmissionType['submitter']>;
type ReviewerType = NonNullable<SubmissionType['reviewer']>;

const getSubmitterAsUser = (submitter: SubmitterType) => {
  if (submitter.__typename === 'UserType') {
    return submitter;
  }
  return null;
};

const getSubmitterAsGroup = (submitter: SubmitterType) => {
  if (submitter.__typename === 'InternalGroupType') {
    return submitter;
  }
  return null;
};

const getSubmitterId = (submitter: SubmitterType): Optional<string> => {
  const submitterAsUser = getSubmitterAsUser(submitter);
  if (submitterAsUser) {
    return submitterAsUser.id;
  }
  const submitterAsGroup = getSubmitterAsGroup(submitter);
  if (submitterAsGroup) {
    return submitterAsGroup.id;
  }
  throw new Error('Submitter is neither a user nor a group');
};

const getSubmitterRowData = (submitter: SubmitterType): SubmitterRowData => {
  const submitterAsUser = getSubmitterAsUser(submitter);
  if (submitterAsUser) {
    return {
      id: submitterAsUser.id,
      name: `${submitterAsUser.lastName}, ${submitterAsUser.name}`,
    };
  }
  const submitterAsGroup = getSubmitterAsGroup(submitter);
  if (submitterAsGroup) {
    return {
      id: submitterAsGroup.id,
      name: submitterAsGroup.groupName,
    };
  }
  throw new Error('Submitter is neither a user nor a group');
};

const getReviewerRowData = (reviewer: ReviewerType): Optional<ReviewerRowData> => {
  const reviewerUser = reviewer.reviewer;
  if (reviewerUser) {
    return {
      id: reviewerUser.id,
      name: `${reviewerUser.lastName}, ${reviewerUser.name}`,
    };
  }
  return undefined;
};

const SubmissionsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get(Query.SubmissionAssignment);

  const { setSubmissionIds } = useSubmissionContext();

  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignmentId);

  const [selectedSubmitterId, setSelectedSubmitterId] =
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
    const validStudent = !selectedSubmitterId
      ? true
      : submitterId === selectedSubmitterId;
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
          submitterId: getSubmitterId(submission.submitter),
          reviewerId: submission.reviewer?.reviewer?.id,
        });
      })
    );

    /* Set chosen submissions to context */
    setSubmissionIds(newSubmissions.map(submission => submission.id));

    const newRowData = newSubmissions.map((submission): RowData => {
      const review = submission?.review;
      const grade = review?.grade;
      const revisionRequested = review?.revisionRequested;
      const submissionAssignmentTitle = allAssignments.find(
        a => a.id === submission.assignmentId
      )?.title;

      return {
        submitter: getSubmitterRowData(submission.submitter),
        assignmentTitle: submissionAssignmentTitle,
        reviewer: submission.reviewer
          ? getReviewerRowData(submission.reviewer)
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
            submitterId: getSubmitterId(submitter),
            reviewerId: reviewerUser?.id,
          }) &&
          !assignment.isGroup
        ) {
          // TODO: TH-191 show group non existent submissions (change isGroup check)
          newRowData.push({
            submitter: getSubmitterRowData(submitter),
            assignmentTitle: assignment.title,
            reviewer: reviewer ? getReviewerRowData(reviewer) : undefined,
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
  }, [selectedSubmitterId, selectedReviewerId, data]);

  return (
    <PageDataContainer>
      <Flex direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
          <Heading>Entregas</Heading>
          {selectedSubmitterId && (
            <FilterBadge
              text={(() => {
                const selectedStudent = rowsSubmitters.find(
                  student => student.id === selectedSubmitterId
                );
                return 'Alumno/Grupo: '.concat(
                  selectedStudent?.name ? selectedStudent.name : ''
                );
              })()}
              iconAriaLabel={'student-filter'}
              onClick={() => setSelectedSubmitterId(null)}
            />
          )}
          {selectedReviewerId && (
            <FilterBadge
              text={(() => {
                const selectedReviewer = rowsReviewers.find(
                  x => x?.id === selectedReviewerId
                );
                return 'Corrector: '.concat(
                  selectedReviewer?.name ? selectedReviewer?.name : ''
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
                    setSelectedSubmitterId(rowData.submitter.id);
                  }}
                >
                  {rowData.submitter.name}
                  {/*todo: TH-170 may be group - show column with checkbox if group and only display group name or student name?*/}
                </Link>,
                rowData.assignmentTitle,
                <Link // Link without redirect
                  onClick={event => {
                    event.stopPropagation(); // This prevents the click from propagating to the parent row
                    setSelectedReviewerId(rowData.reviewer?.id);
                  }}
                >
                  {rowData.reviewer ? rowData.reviewer.name : '-'}
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
