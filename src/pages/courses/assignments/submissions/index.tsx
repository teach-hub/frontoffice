import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';
import { useSubmissionContext } from 'hooks/useSubmissionsContext';
import useToast from 'hooks/useToast';

import SubmissionsQuery from 'graphql/AssignmentSubmissionsQuery';

import {
  Flex,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { theme } from 'theme';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import { FilterBadge } from 'components/FilterBadge';
import Link from 'components/Link';
import { SubmissionsTable } from 'components/SubmissionsTable';

import { Query } from 'queries';
import { Nullable, Optional } from 'types';

import type {
  RowData,
  SubjectRowData,
  ReviewerRowData,
  SubmitterRowData,
  GroupSubmitterRowData,
} from 'components/SubmissionsTable';

import type {
  AssignmentSubmissionsQuery,
  AssignmentSubmissionsQuery$data,
} from '__generated__/AssignmentSubmissionsQuery.graphql';

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

const getSubmitterRowData = (
  submitter: SubmitterType
): SubmitterRowData | GroupSubmitterRowData => {
  const submitterAsUser = getSubmitterAsUser(submitter);
  if (submitterAsUser) {
    return {
      id: submitterAsUser.id,
      name: `${submitterAsUser.lastName}, ${submitterAsUser.name}`,
      isGroup: false,
    };
  }
  const submitterAsGroup = getSubmitterAsGroup(submitter);
  if (submitterAsGroup) {
    return {
      id: submitterAsGroup.id,
      name: submitterAsGroup.groupName,
      isGroup: true,
      participants: submitterAsGroup.usersForAssignment.map(user => ({
        id: user.id,
        name: `${user.lastName}, ${user.name}`,
      })),
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

const enum TabIndex {
  NonGroup = 0,
  Group = 1,
}

const SubmissionsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get(Query.SubmissionAssignment);

  const { setSubmissionIds } = useSubmissionContext();

  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignmentId);

  const [selectedStudentUserId, setSelectedStudentUserId] =
    useState<Optional<Nullable<string>>>(null);
  const [selectedReviewerId, setSelectedReviewerId] =
    useState<Optional<Nullable<string>>>(null);

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId: selectedAssignmentId,
    courseId: courseContext.courseId,
  });

  const allAssignments = data.viewer?.course?.assignments || [];

  const rowEnabledByFilters = ({
    submitter,
    reviewerId,
  }: {
    submitter: SubmitterType;
    reviewerId?: string;
  }) => {
    let validStudent = true;
    if (selectedStudentUserId) {
      const submitterAsUser = getSubmitterAsUser(submitter);
      if (submitterAsUser) {
        validStudent = submitterAsUser.id === selectedStudentUserId;
      } else {
        const submitterAsGroup = getSubmitterAsGroup(submitter);
        if (submitterAsGroup) {
          validStudent = submitterAsGroup.usersForAssignment.some(
            user => user.id === selectedStudentUserId
          );
        }
      }
    }
    const validReviewer = !selectedReviewerId ? true : reviewerId === selectedReviewerId;
    return validStudent && validReviewer;
  };

  const [groupRowDataList, setGroupRowDataList] = useState<RowData[]>([]);
  const [nonGroupRowDataList, setNonGroupRowDataList] = useState<RowData[]>([]);
  const [rowsStudents, setRowsStudents] = useState<SubjectRowData[]>([]);
  const [rowsReviewers, setRowsReviewers] = useState<ReviewerRowData[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(TabIndex.NonGroup);

  useEffect(() => {
    const assignmentSubmissionsData =
      data.viewer?.course?.assignmentsWithSubmissions || [];
    const newSubmissions = assignmentSubmissionsData.flatMap(assignment =>
      (assignment?.submissions || []).filter(submission => {
        return rowEnabledByFilters({
          submitter: submission.submitter,
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
              revisionRequested: revisionRequested ?? false,
              id: submission.id,
              pullRequestUrl: submission.pullRequestUrl,
              submittedAt: submission.submittedAt,
              submittedAgainAt: submission.submittedAgainAt,
              reviewedAt: review?.reviewedAt,
              reviewedAgainAt: review?.reviewedAgainAt,
            }
          : undefined,
      };
    });

    assignmentSubmissionsData.forEach(assignment =>
      (assignment?.nonExistentSubmissions || []).forEach(({ reviewer, submitter }) => {
        const reviewerUser = reviewer?.reviewer;
        if (
          rowEnabledByFilters({
            submitter,
            reviewerId: reviewerUser?.id,
          })
        ) {
          newRowData.push({
            submitter: getSubmitterRowData(submitter),
            assignmentTitle: assignment.title,
            reviewer: reviewer ? getReviewerRowData(reviewer) : undefined,
          });
        }
      })
    );

    /* Separate group from non group rows */
    const groupRowDataList: RowData[] = [];
    const nonGroupRowDataList: RowData[] = [];
    newRowData.forEach(rowData => {
      if (rowData.submitter.isGroup) {
        groupRowDataList.push(rowData);
      } else {
        nonGroupRowDataList.push(rowData);
      }
    });

    setGroupRowDataList(groupRowDataList);
    setNonGroupRowDataList(nonGroupRowDataList);

    const newTabIndex =
      nonGroupRowDataList.length === 0 // If no non group submissions, show group submissions
        ? TabIndex.Group
        : groupRowDataList.length === 0 // If no group submissions, show non group submissions
        ? TabIndex.NonGroup
        : selectedTabIndex; // In any other case, keep the current tab
    setSelectedTabIndex(newTabIndex);

    setRowsReviewers(
      newRowData.map(row => row.reviewer).filter(Boolean) as ReviewerRowData[]
    );

    setRowsStudents(
      /* Keep both ids of groups and users */
      nonGroupRowDataList
        .map(row => row.submitter)
        .concat(
          groupRowDataList
            .flatMap(row => (row.submitter as GroupSubmitterRowData).participants)
            .filter(Boolean) as SubmitterRowData[]
        )
        .filter(Boolean) as SubmitterRowData[]
    );
  }, [selectedStudentUserId, selectedReviewerId, data]);

  const onRowClick = (rowData: RowData) => {
    rowData.submission?.id
      ? navigate(rowData.submission?.id)
      : toast({
          title: 'No existe entrega asociada',
          description: 'Para acceder al detalle primero se debe realizar la entrega',
          status: 'warning',
        });
  };

  return (
    <PageDataContainer>
      <Flex direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
          <Heading>Entregas</Heading>
          {selectedStudentUserId && (
            <FilterBadge
              text={(() => {
                /* Submitter may either be a group or student */
                const selectedStudent = rowsStudents.find(
                  student => student.id === selectedStudentUserId
                );
                return 'Alumno: '.concat(
                  selectedStudent?.name ? selectedStudent.name : ''
                );
              })()}
              iconAriaLabel={'student-filter'}
              onClick={() => setSelectedStudentUserId(null)}
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
      <Tabs
        index={selectedTabIndex}
        onChange={index => setSelectedTabIndex(index)}
        marginTop={'10px'}
      >
        <TabList>
          <Tab isDisabled={nonGroupRowDataList.length === 0}>Individuales</Tab>
          <Tab isDisabled={groupRowDataList.length === 0}>Grupales</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack height={'70vh'}>
              <SubmissionsTable
                rowDataList={nonGroupRowDataList}
                submitterNameHeader={'Alumno'}
                onRowClick={onRowClick}
                updateSelectedSubmitterCallback={submitterId =>
                  setSelectedStudentUserId(submitterId)
                }
                updateSelectedReviewerCallback={reviewerId =>
                  setSelectedReviewerId(reviewerId)
                }
              />
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack height={'70vh'}>
              <SubmissionsTable
                rowDataList={groupRowDataList}
                submitterNameHeader={'Grupo'}
                onRowClick={onRowClick}
                updateSelectedReviewerCallback={reviewerId =>
                  setSelectedReviewerId(reviewerId)
                }
                extraColumn={{
                  header: 'Alumnos',
                  columnIndex: 1,
                  content: rowData => {
                    const group = rowData.submitter as GroupSubmitterRowData;
                    return (
                      <Stack>
                        {group.participants.map(participant => (
                          <Link // Link without redirect
                            onClick={event => {
                              event.stopPropagation(); // This prevents the click from propagating to the parent row
                              setSelectedStudentUserId(participant.id);
                            }}
                          >
                            {participant.name}
                          </Link>
                        ))}
                      </Stack>
                    );
                  },
                }}
              />
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
