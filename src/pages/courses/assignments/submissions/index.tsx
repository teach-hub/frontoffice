import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import { partition } from 'lodash';

import { FetchedContext, Permission, useUserContext } from 'hooks/useUserCourseContext';
import { useSubmissionContext } from 'hooks/useSubmissionsContext';
import useToast, { showWarningToast } from 'hooks/useToast';

import SubmissionsQuery from 'graphql/AssignmentSubmissionsQuery';

import {
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import { FilterBadge } from 'components/FilterBadge';
import type {
  GroupSubmitterRowData,
  ReviewerRowData,
  RowData,
  SubjectRowData,
  SubmitterRowData,
} from 'components/SubmissionsTable';
import { SubmissionsTable } from 'components/SubmissionsTable';

import { Query } from 'queries';
import { Nullable, Optional } from 'types';
import { FormControl } from 'components/FormControl';
import { getSubmissionsReviewStatusLabel, SubmissionStatus } from 'app/submissions';

import type {
  AssignmentSubmissionsQuery,
  AssignmentSubmissionsQuery$data,
} from '__generated__/AssignmentSubmissionsQuery.graphql';
import { Modal } from 'components/Modal';
import NotifyModalContent from 'components/SubmissionNotificationModalContent';
import { buildSubmissionRoute } from 'routes';
import Select from 'components/Select';

type SubmissionType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<AssignmentSubmissionsQuery$data['viewer']>['course']
    >['assignmentsWithSubmissions'][number]
  >['submissions'][number]
>;

type NonExistentSubmissionType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<AssignmentSubmissionsQuery$data['viewer']>['course']
    >['assignmentsWithSubmissions'][number]
  >['nonExistentSubmissions'][number]
>;

type SubmitterType = NonNullable<SubmissionType['submitter']>;
type ReviewerType = NonNullable<SubmissionType['reviewer']>;
type ReviewType = NonNullable<SubmissionType['review']>;

const getSubmitterAsUser = (
  submitter: SubmitterType
): Extract<SubmitterType, { __typename: 'UserType' }> | null => {
  if (submitter.__typename === 'UserType') {
    return submitter;
  }
  return null;
};

const getSubmitterAsGroup = (
  submitter: SubmitterType
): Extract<SubmitterType, { __typename: 'InternalGroupType' }> | null => {
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
      notificationEmail: submitterAsUser.notificationEmail,
    };
  }
  const submitterAsGroup = getSubmitterAsGroup(submitter);
  if (submitterAsGroup) {
    return {
      id: submitterAsGroup.id,
      name: submitterAsGroup.groupName,
      isGroup: true,
      participants: submitterAsGroup.members.map(user => ({
        id: user.id,
        name: `${user.lastName}, ${user.name}`,
        notificationEmail: user.notificationEmail,
      })),
      notificationEmail: undefined, // Group has no email
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
      notificationEmail: undefined, // Reviewer does not need to be notified
    };
  }
  return undefined;
};

enum TabIndex {
  NonGroup = 0,
  Group = 1,
}

const SubmissionsPage = ({ courseContext }: { courseContext: FetchedContext }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get(Query.SubmissionAssignment);

  const notifyButtonEnabled = courseContext.userHasPermission(
    Permission.SendNotifications
  );
  const onlyReviewerSubmissions = !courseContext.userHasPermission(
    Permission.ViewAllSubmissions
  );

  const {
    isOpen: isOpenNotificationModal,
    onOpen: onOpenNotificationModal,
    onClose: onCloseNotificationModal,
  } = useDisclosure();

  const [rowToNotify, setRowToNotify] = useState<RowData | null>(null);

  // Filtros de diferentes tipos.
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignmentId);
  const [selectedSubmissionStatus, setSelectedSubmissionStatus] =
    useState<Nullable<SubmissionStatus>>(null);
  const [selectedStudentUserId, setSelectedStudentUserId] =
    useState<Optional<Nullable<string>>>(null);
  const [selectedReviewerId, setSelectedReviewerId] =
    useState<Optional<Nullable<string>>>(null);

  const { setSubmissionIds } = useSubmissionContext();

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId: selectedAssignmentId,
    courseId: courseContext.courseId,
    onlyReviewerSubmissions,
  });

  const allAssignments = data.viewer?.course?.assignments || [];

  type TargetRow = {
    submitter: SubmitterType;
    reviewerId?: string;
    review: Nullable<ReviewType>;
    submission: Nullable<SubmissionType>;
  };

  const [groupRowDataList, setGroupRowDataList] = useState<RowData[]>([]);
  const [nonGroupRowDataList, setNonGroupRowDataList] = useState<RowData[]>([]);
  const [rowsStudents, setRowsStudents] = useState<SubjectRowData[]>([]);
  const [rowsReviewers, setRowsReviewers] = useState<ReviewerRowData[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(TabIndex.NonGroup);

  useEffect(() => {
    const assignmentSubmissionsData =
      data.viewer?.course?.assignmentsWithSubmissions || [];

    // Creamos `submissions` con las entregas hechas.
    const submissions = assignmentSubmissionsData.flatMap(
      (
        assignment
      ): (SubmissionType | (NonExistentSubmissionType & { assignmentId: string }))[] => {
        // Vemos si somos profesor o no.
        // Si lo somos usamos la data de los alumnos y si no miramos solo las del viewer.
        const nonExistentSubmissions = courseContext.userIsTeacher
          ? assignment?.nonExistentSubmissions
          : assignment?.nonExistentViewerSubmission && [
              assignment?.nonExistentViewerSubmission,
            ];

        const nonExistentFiltered = (nonExistentSubmissions || []).filter(
          ({ reviewer, submitter }) => {
            const reviewerUser = reviewer?.reviewer;

            return isRowEnabledByFilters({
              submitter,
              reviewerId: reviewerUser?.id,
              review: null,
              submission: null,
            });
          }
        );

        // Vemos si somos profesor o no.
        // Si lo somos usamos la data de los alumnos y si no miramos solo las del viewer.
        const assignmentSubmissions = courseContext.userIsTeacher
          ? assignment?.submissions
          : assignment?.viewerSubmission && [assignment?.viewerSubmission];

        const existentFiltered = (assignmentSubmissions || []).filter(submission => {
          return isRowEnabledByFilters({
            submitter: submission.submitter,
            reviewerId: submission.reviewer?.reviewer?.id,
            review: submission.review,
            submission,
          });
        });

        return nonExistentFiltered
          .map(s => ({ ...s, assignmentId: assignment.id }))
          .concat(existentFiltered);
      }
    );

    const submissionsData = submissions.map((submission): RowData => {
      // Diferenciamos los non-existent de los existent.
      if ('review' in submission) {
        const review = submission?.review;
        const grade = review?.grade;
        const revisionRequested = review?.revisionRequested;
        const relatedAssignment = allAssignments.find(
          ({ id }) => id === submission.assignmentId
        );

        return {
          submitter: getSubmitterRowData(submission.submitter),
          assignmentId: submission.assignmentId,
          assignmentTitle: relatedAssignment?.title,
          reviewer: submission.reviewer
            ? getReviewerRowData(submission.reviewer)
            : undefined,
          submission: submission.id
            ? {
                grade,
                revisionRequested,
                id: submission.id,
                pullRequestUrl: submission.pullRequestUrl,
                submittedAt: submission.submittedAt,
                submittedAgainAt: submission.submittedAgainAt,
                reviewedAt: review?.reviewedAt,
                reviewedAgainAt: review?.reviewedAgainAt,
              }
            : undefined,
        };
      } else {
        const assignment = allAssignments.find(
          ({ id }) => id === submission.assignmentId
        );

        return {
          submitter: getSubmitterRowData(submission.submitter),
          assignmentTitle: assignment?.title,
          assignmentId: submission.assignmentId,
          reviewer: submission.reviewer
            ? getReviewerRowData(submission.reviewer)
            : undefined,
        };
      }
    });

    /* Separate group from non group rows */
    const [groupRowDataList, nonGroupRowDataList]: [RowData[], RowData[]] = partition(
      submissionsData.sort(
        (a, b) => a.submitter.name?.localeCompare(b.submitter.name || '') || 0
      ),
      rowData => rowData.submitter.isGroup
    );

    setGroupRowDataList(groupRowDataList);
    setNonGroupRowDataList(nonGroupRowDataList);

    const emptyNonGroupRowDataList = nonGroupRowDataList.length === 0;
    const emptyGroupRowDataList = groupRowDataList.length === 0;

    const newTabIndex =
      emptyGroupRowDataList && emptyNonGroupRowDataList
        ? selectedTabIndex
        : emptyNonGroupRowDataList // If no non group submissions, show group submissions
        ? TabIndex.Group
        : emptyGroupRowDataList // If no group submissions, show non group submissions
        ? TabIndex.NonGroup
        : selectedTabIndex; // In any other case, keep the current tab

    const isGroupTab = newTabIndex === TabIndex.Group;
    setSelectedTabIndex(newTabIndex);

    setSubmissionIds(
      (isGroupTab ? groupRowDataList : nonGroupRowDataList)
        .map(rowData => rowData.submission?.id)
        .filter(Boolean) as string[]
    );

    setRowsReviewers(
      submissionsData.map(row => row.reviewer).filter(Boolean) as ReviewerRowData[]
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
  }, [selectedStudentUserId, selectedReviewerId, selectedSubmissionStatus, data]);

  const isRowEnabledByFilters = ({
    submitter,
    reviewerId,
    submission,
    review,
  }: TargetRow) => {
    let isValidStudent = true;
    let hasValidStatus = true;

    const hasValidReviewer = selectedReviewerId
      ? reviewerId === selectedReviewerId
      : true;

    if (selectedStudentUserId) {
      const submitterAsUser = getSubmitterAsUser(submitter);
      if (submitterAsUser) {
        isValidStudent = submitterAsUser.id === selectedStudentUserId;
      } else {
        const submitterAsGroup = getSubmitterAsGroup(submitter);
        if (submitterAsGroup) {
          isValidStudent = submitterAsGroup.members.some(
            user => user.id === selectedStudentUserId
          );
        }
      }
    }

    if (selectedSubmissionStatus) {
      const status = getSubmissionsReviewStatusLabel({
        submission,
        review,
      });
      hasValidStatus = status === selectedSubmissionStatus;
    }

    return isValidStudent && hasValidReviewer && hasValidStatus;
  };

  const onRowClick = (rowData: RowData) => {
    rowData.submission?.id
      ? navigate(buildSubmissionRoute(courseContext.courseId, rowData.submission?.id))
      : showWarningToast({
          toast,
          title: 'No existe entrega asociada',
          description: 'Para acceder al detalle primero se debe realizar la entrega',
        });
  };

  const handleOpenNotificationModal = (rowData: RowData) => {
    setRowToNotify(rowData);
    onOpenNotificationModal();
  };

  const handleCloseNotificationModal = () => {
    setRowToNotify(null);
    onCloseNotificationModal();
  };

  return (
    <PageDataContainer>
      <HStack justifyContent={'space-between'} alignItems={'flex-start'}>
        <HStack alignItems={'center'} gap={'20px'}>
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
        </HStack>
        <HStack gap={'10px'}>
          <FormControl label={''}>
            <Select
              width={'max-content'}
              placeholder={'Todos (Estados)'} // Placeholder works as disabling the filter when chosen
              value={selectedSubmissionStatus || ''} // Set value to show selected option, or placeholder otherwise
              onChange={changes => {
                const newValue = changes.currentTarget.value;
                setSelectedSubmissionStatus(
                  newValue ? (newValue as SubmissionStatus) : null
                );
              }}
            >
              {(Object.keys(SubmissionStatus) as (keyof typeof SubmissionStatus)[]).map(
                key => (
                  <option value={SubmissionStatus[key]} key={SubmissionStatus[key]}>
                    {SubmissionStatus[key]}
                  </option>
                )
              )}
            </Select>
          </FormControl>
          <FormControl label={''}>
            <Select
              width={'max-content'}
              placeholder={'Todos (Trabajos Prácticos)'} // Placeholder works as disabling the filter when chosen
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
          </FormControl>
        </HStack>
      </HStack>
      <Tabs
        index={selectedTabIndex}
        onChange={index => {
          const isGroupTab = index === TabIndex.Group;
          setSelectedTabIndex(index);

          /* If index is updated, also updated selected submission ids */
          setSubmissionIds(
            (isGroupTab ? groupRowDataList : nonGroupRowDataList)
              .map(rowData => rowData.submission?.id)
              .filter(Boolean) as string[]
          );
        }}
      >
        <TabList>
          <Tab isDisabled={!nonGroupRowDataList.length}>Individuales</Tab>
          <Tab isDisabled={!groupRowDataList.length}>Grupales</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack height={'70vh'}>
              <SubmissionsTable
                rowDataList={nonGroupRowDataList}
                onRowClick={onRowClick}
                updateSelectedStudentCallback={submitterId =>
                  setSelectedStudentUserId(submitterId)
                }
                updateSelectedReviewerCallback={reviewerId =>
                  setSelectedReviewerId(reviewerId)
                }
                onNotifyClick={handleOpenNotificationModal}
                showNotifyButton={notifyButtonEnabled}
              />
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack height={'70vh'}>
              <SubmissionsTable
                rowDataList={groupRowDataList}
                onRowClick={onRowClick}
                updateSelectedReviewerCallback={reviewerId =>
                  setSelectedReviewerId(reviewerId)
                }
                updateSelectedStudentCallback={submitterId =>
                  setSelectedStudentUserId(submitterId)
                }
                groupParticipantsGetter={rowData =>
                  (rowData.submitter as GroupSubmitterRowData).participants
                }
                onNotifyClick={handleOpenNotificationModal}
                showNotifyButton={notifyButtonEnabled}
              />
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal
        isOpen={isOpenNotificationModal}
        onClose={handleCloseNotificationModal}
        isCentered
        headerText={'Notificar alumno/s'}
        contentProps={{ minWidth: 'fit-content' }}
      >
        {rowToNotify ? (
          <NotifyModalContent
            rowToNotify={rowToNotify}
            onCompleted={handleCloseNotificationModal}
            courseId={courseContext.courseId}
          />
        ) : (
          <div></div>
        )}
      </Modal>
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
