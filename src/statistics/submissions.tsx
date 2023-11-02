import { Nullable, Optional } from 'types';
import { SubmissionStatus } from 'app/submissions';
import { theme } from 'theme';

/*
 * Handle separated status for statistics, that groups statuses
 * that are in review
 * */
const SUBMISSION_IN_REVIEW_LABEL = 'En corrección';

const SUBMISSIONS_STATUS_STATISTICS_DATA = [
  {
    status: SubmissionStatus.NonExistent,
    backgroundColor: `${theme.colors.teachHub.black}`,
  },
  {
    status: SubmissionStatus.MissingReview,
    backgroundColor: `${theme.colors.teachHub.red}`,
  },
  {
    status: SUBMISSION_IN_REVIEW_LABEL,
    backgroundColor: `${theme.colors.teachHub.yellow}`,
  },
  {
    status: SubmissionStatus.Reviewed,
    backgroundColor: `${theme.colors.teachHub.green}`,
  },
];

type ReviewerData = {
  id: string;
  fullName: string;
};

type ReviewerStatusStatisticsData = {
  reviewer: ReviewerData;
  status: string;
};

type NonExistentSubmissionStatisticsData = {
  reviewer?: ReviewerData;
};

type SubmissionStatisticsData = {
  grade: Optional<Nullable<number>>;
  revisionRequested: Optional<Nullable<boolean>>;
  reviewer?: ReviewerData;
};

// Type to use on statistics, after assignment was processed
type AssignmentSubmissionStatisticsDataForPlots = {
  assignmentTitle: string;
  submissions: SubmissionStatisticsData[];
  nonExistentSubmissionsAmount: number;
  nonExistentSubmissions?: NonExistentSubmissionStatisticsData[];
};

type AssignmentStatisticsReviewerData = {
  id: string;
  lastName: string;
  name: string;
};

// Type to receive from assignment and use on statistics
export type AssignmentStatisticsData = {
  title: string;
  submissions?: Optional<
    {
      grade: Optional<Nullable<number>>;
      revisionRequested: Optional<Nullable<boolean>>;
      reviewer: Optional<AssignmentStatisticsReviewerData>;
    }[]
  >;
  nonExistentSubmissions?: {
    reviewer: Optional<AssignmentStatisticsReviewerData>;
  }[];
};

const getSubmissionStatusLabel = (
  submissionStatisticsData: SubmissionStatisticsData
): string => {
  const { grade, revisionRequested } = submissionStatisticsData;
  const hasGrade = !!grade;
  const missingReview = !hasGrade && !revisionRequested;
  if (missingReview) {
    return SubmissionStatus.MissingReview;
  } else if (hasGrade) {
    return SubmissionStatus.Reviewed;
  } else {
    return SUBMISSION_IN_REVIEW_LABEL;
  }
};

const buildAssignmentStatisticsData = ({
  title,
  submissions,
  nonExistentSubmissions,
}: AssignmentStatisticsData): AssignmentSubmissionStatisticsDataForPlots => {
  // If no reviewer assigned, set custom id to be able to group as a common reviewer
  const NO_REVIEWER_ID = 'no-reviewer-fake-id';
  const NO_REVIEWER_NAME = 'Sin Corrector';

  const getSubmissionsReviewer = (
    reviewerUser: Optional<AssignmentStatisticsReviewerData>
  ) => {
    return {
      id: reviewerUser?.id || NO_REVIEWER_ID,
      fullName: reviewerUser
        ? `${reviewerUser?.lastName}, ${reviewerUser?.name}`
        : NO_REVIEWER_NAME,
    };
  };

  return {
    assignmentTitle: title,
    submissions:
      submissions?.map(submission => ({
        grade: submission?.grade,
        revisionRequested: submission?.revisionRequested,
        reviewer: getSubmissionsReviewer(submission?.reviewer),
      })) || [],
    nonExistentSubmissionsAmount: nonExistentSubmissions?.length || 0,
    nonExistentSubmissions: nonExistentSubmissions?.map(submission => ({
      reviewer: getSubmissionsReviewer(submission?.reviewer),
    })),
  };
};

/**
 * Returns statistics data for the submissions of an assignment,
 * containing an entry for each status, with the data being the
 * amount of submissions on the given status for each assignment
 * */
export const getAssignmentSubmissionStatusDataset = (
  assignmentStatisticsData: AssignmentStatisticsData[]
) => {
  const assignmentSubmissionsStatisticsData = assignmentStatisticsData.map(
    buildAssignmentStatisticsData
  );
  const assignmentsStatusList = assignmentSubmissionsStatisticsData.map(item => {
    return item.submissions
      .map(getSubmissionStatusLabel)
      .concat(
        Array(item.nonExistentSubmissionsAmount).fill(SubmissionStatus.NonExistent)
      );
  });

  return SUBMISSIONS_STATUS_STATISTICS_DATA.map(item => {
    return {
      label: item.status,
      data: assignmentsStatusList.map(
        a => a.filter(status => status === item.status).length
      ),
      backgroundColor: item.backgroundColor,
    };
  });
};

/**
 * Returns the statistics data for the submissions of a given assignment,
 * returning both the labels (name of the reviewers) and the datasets,
 * which contain an entry for reach status, with the data being the
 * amount of submissions on the given status for each reviewer
 * */
export const getAssignmentSubmissionReviewersDataset = (
  assignmentStatisticsData: AssignmentStatisticsData
) => {
  const assignmentSubmissionsStatisticsData = buildAssignmentStatisticsData(
    assignmentStatisticsData
  );

  // Get the status of each submission, with the reviewer associated to it
  const reviewerStatusList: ReviewerStatusStatisticsData[] =
    assignmentSubmissionsStatisticsData.submissions
      .map(item => {
        return (
          item.reviewer && {
            reviewer: item.reviewer,
            status: getSubmissionStatusLabel(item),
          }
        );
      })
      .concat(
        assignmentSubmissionsStatisticsData.nonExistentSubmissions?.map(item => {
          return (
            item.reviewer && {
              reviewer: item.reviewer,
              status: SubmissionStatus.NonExistent,
            }
          );
        }) || []
      )
      .filter(Boolean) as ReviewerStatusStatisticsData[];

  const statusCountMapByReviewer = reviewerStatusList.reduce((acc, item) => {
    // If reviewer not previously added, add it
    if (!acc[item.reviewer.id]) acc[item.reviewer.id] = {};

    const reviewerStatusCountMap = acc[item.reviewer.id];

    // Count the amount of submissions in each status for the given reviewer
    if (!reviewerStatusCountMap[item.status]) reviewerStatusCountMap[item.status] = 1;
    else reviewerStatusCountMap[item.status] = reviewerStatusCountMap[item.status] + 1;

    return acc;
  }, {} as Record<string, Record<string, number>>);

  // Use the reviewers names as labels
  const labels: string[] = Object.keys(statusCountMapByReviewer)
    .map(
      reviewerId =>
        reviewerStatusList.find(item => item.reviewer.id === reviewerId)?.reviewer
          ?.fullName
    )
    .filter(Boolean) as string[];

  const datasets = SUBMISSIONS_STATUS_STATISTICS_DATA.map(item => {
    return {
      label: item.status,
      backgroundColor: item.backgroundColor,
      data: Object.values(statusCountMapByReviewer).map(
        statusCount => statusCount[item.status] || 0
      ), // If no submissions in this status, return 0
    };
  });

  return {
    labels,
    datasets,
  };
};
