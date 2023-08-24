import { Nullable, Optional } from 'types';
import { SubmissionStatus } from 'app/submissions';
import { theme } from 'theme';

const getSubmissionStatus = (
  submissionStatisticsData: SubmissionStatisticsData
): SubmissionStatus => {
  const { grade, revisionRequested } = submissionStatisticsData;
  const hasGrade = !!grade;
  const missingReview = !hasGrade && !revisionRequested;
  if (missingReview) {
    return SubmissionStatus.MissingReview;
  } else if (hasGrade) {
    return SubmissionStatus.Reviewed;
  } else {
    return SubmissionStatus.InReview;
  }
};

type SubmissionStatisticsData = {
  grade: Optional<Nullable<number>>;
  revisionRequested: Optional<Nullable<boolean>>;
};

export type AssignmentSubmissionStatisticsData = {
  assignmentTitle: string;
  submissions: SubmissionStatisticsData[];
  nonExistentSubmissionsAmount: number;
};

export const getAssignmentSubmissionStatusDataset = (
  assignmentSubmissionsStatisticsData: AssignmentSubmissionStatisticsData[]
) => {
  const assignmentsStatusList = assignmentSubmissionsStatisticsData.map(item => {
    return item.submissions
      .map(getSubmissionStatus)
      .concat(
        Array(item.nonExistentSubmissionsAmount).fill(SubmissionStatus.NonExistent)
      );
  });

  return [
    {
      status: SubmissionStatus.Reviewed,
      backgroundColor: `${theme.colors.teachHub.green}`,
    },
    {
      status: SubmissionStatus.InReview,
      backgroundColor: `${theme.colors.teachHub.yellow}`,
    },
    {
      status: SubmissionStatus.MissingReview,
      backgroundColor: `${theme.colors.teachHub.red}`,
    },
    {
      status: SubmissionStatus.NonExistent,
      backgroundColor: `${theme.colors.teachHub.black}`,
    },
  ].map(item => {
    return {
      label: item.status,
      data: assignmentsStatusList.map(
        a => a.filter(status => status === item.status).length
      ),
      backgroundColor: item.backgroundColor,
    };
  });
};
