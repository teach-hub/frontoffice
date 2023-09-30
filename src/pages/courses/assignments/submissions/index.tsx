import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { FetchedContext, Permission, useUserContext } from 'hooks/useUserCourseContext';
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
  useDisclosure,
} from '@chakra-ui/react';
import { theme } from 'theme';

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

type SubmissionType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<AssignmentSubmissionsQuery$data['viewer']>['course']
    >['assignmentsWithSubmissions'][number]
  >['submissions'][number]
>;

type SubmitterType = NonNullable<SubmissionType['submitter']>;
type ReviewerType = NonNullable<SubmissionType['reviewer']>;
type ReviewType = NonNullable<SubmissionType['review']>;

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
      notificationEmail: submitterAsUser.notificationEmail,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get(Query.SubmissionAssignment);

  const showNotifyButton = courseContext.userHasPermission(Permission.SendNotifications);

  const {
    isOpen: isOpenNotificationModal,
    onOpen: onOpenNotificationModal,
    onClose: onCloseNotificationModal,
  } = useDisclosure();

  const [rowToNotify, setRowToNotify] = useState<RowData | undefined>(undefined);

  const handleOpenNotificationModal = (rowData: RowData) => {
    setRowToNotify(rowData);
    onOpenNotificationModal();
  };

  const handleCloseNotificationModal = () => {
    setRowToNotify(undefined);
    onCloseNotificationModal();
  };

  const { setSubmissionIds } = useSubmissionContext();

  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(assignmentId);
  const [selectedSubmissionStatus, setSelectedSubmissionStatus] =
    useState<Nullable<SubmissionStatus>>(null);

  const [selectedStudentUserId, setSelectedStudentUserId] =
    useState<Optional<Nullable<string>>>(null);
  const [selectedReviewerId, setSelectedReviewerId] =
    useState<Optional<Nullable<string>>>(null);

  const onlyReviewerSubmissions = !courseContext.userHasPermission(
    Permission.ViewAllSubmissions
  );

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId: selectedAssignmentId,
    courseId: courseContext.courseId,
    onlyReviewerSubmissions: onlyReviewerSubmissions,
  });

  const allAssignments = data.viewer?.course?.assignments || [];

  const rowEnabledByFilters = ({
    submitter,
    reviewerId,
    submission,
    review,
  }: {
    submitter: SubmitterType;
    reviewerId?: string;
    review: Nullable<ReviewType>;
    submission: Nullable<SubmissionType>;
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

    let validStatus = true;
    if (selectedSubmissionStatus) {
      const status = getSubmissionsReviewStatusLabel({
        submission,
        review,
      });
      validStatus = status === selectedSubmissionStatus;
    }

    return validStudent && validReviewer && validStatus;
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
          review: submission.review,
          submission: submission,
        });
      })
    );

    const newRowData = newSubmissions.map((submission): RowData => {
      const review = submission?.review;
      const grade = review?.grade;
      const revisionRequested = review?.revisionRequested;
      const submissionAssignmentTitle = allAssignments.find(
        a => a.id === submission.assignmentId
      )?.title;

      return {
        submitter: getSubmitterRowData(submission.submitter),
        assignmentId: submission.assignmentId,
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
            review: null,
            submission: null,
          })
        ) {
          newRowData.push({
            submitter: getSubmitterRowData(submitter),
            assignmentTitle: assignment.title,
            assignmentId: assignment.id,
            reviewer: reviewer ? getReviewerRowData(reviewer) : undefined,
          });
        }
      })
    );

    /* Separate group from non group rows */
    const groupRowDataList: RowData[] = [];
    const nonGroupRowDataList: RowData[] = [];
    newRowData
      .sort((a, b) => {
        return a.submitter.name?.localeCompare(b.submitter.name || '') || 0;
      }) // Sort rows by submitter name
      .forEach(rowData => {
        if (rowData.submitter.isGroup) {
          groupRowDataList.push(rowData);
        } else {
          nonGroupRowDataList.push(rowData);
        }
      });

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
  }, [selectedStudentUserId, selectedReviewerId, selectedSubmissionStatus, data]);

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
        <Stack gap={'10px'} direction={'row'}>
          <FormControl label={'Estado'}>
            <Select
              borderColor={theme.colors.teachHub.black}
              placeholder={'- Sin filtrar -'} // Placeholder works as disabling the filter when chosen
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
          <FormControl label={'Trabajo Práctico'}>
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
          </FormControl>
        </Stack>
      </Flex>
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
          <Tab isDisabled={nonGroupRowDataList.length === 0}>Individuales</Tab>
          <Tab isDisabled={groupRowDataList.length === 0}>Grupales</Tab>
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
                showNotifyButton={showNotifyButton}
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
                showNotifyButton={showNotifyButton}
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
