import { theme } from 'theme';
import { Nullable, Optional } from 'types';

export type BadgeConfiguration = {
  badgeBackgroundColor: string;
  badgeTextColor: string;
};

export enum SubmissionStatus {
  NonExistent = 'Sin entregar',
  MissingReview = 'Sin corregir',
  NewSubmissionRequested = 'Reentrega solicitada',
  InReview = 'En corrección',
  Reviewed = 'Corregido',
}

export type SubmissionReviewStatusConfiguration = BadgeConfiguration & {
  text: string;
};

const SuccessBadgeConfiguration: BadgeConfiguration = {
  badgeBackgroundColor: theme.colors.teachHub.success,
  badgeTextColor: theme.colors.teachHub.white,
};

const ErrorBadgeConfiguration: BadgeConfiguration = {
  badgeBackgroundColor: theme.colors.teachHub.error,
  badgeTextColor: theme.colors.teachHub.white,
};

const NonExistentBadgeConfiguration: BadgeConfiguration = {
  badgeBackgroundColor: theme.colors.teachHub.black,
  badgeTextColor: theme.colors.teachHub.white,
};

const WarningBadgeConfiguration: BadgeConfiguration = {
  badgeBackgroundColor: theme.colors.teachHub.warning,
  badgeTextColor: theme.colors.teachHub.black,
};

export const getSubmissionMissingStatusConfiguration = () => {
  return {
    text: SubmissionStatus.NonExistent,
    ...NonExistentBadgeConfiguration,
  };
};

export const getSubmissionReviewStatusConfiguration = ({
  grade,
  revisionRequested,
}: {
  grade: Optional<Nullable<number>>;
  revisionRequested: Optional<Nullable<boolean>>;
}): SubmissionReviewStatusConfiguration => {
  if (grade) {
    return {
      text: SubmissionStatus.Reviewed,
      ...SuccessBadgeConfiguration,
    };
  } else if (revisionRequested) {
    return {
      text: SubmissionStatus.NewSubmissionRequested,
      ...WarningBadgeConfiguration,
    };
  } else {
    return {
      text: SubmissionStatus.MissingReview,
      ...ErrorBadgeConfiguration,
    };
  }
};

export const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const getGradeConfiguration = (
  grade: Optional<Nullable<number>>
): BadgeConfiguration => {
  if (grade) {
    if (grade >= 4) return SuccessBadgeConfiguration;
    else return ErrorBadgeConfiguration;
  } else {
    return {
      badgeBackgroundColor: theme.colors.teachHub.gray,
      badgeTextColor: theme.colors.teachHub.black,
    };
  }
};
