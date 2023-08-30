import type { Nullable, Optional } from 'types';

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
  badgeBackgroundColor: 'teachHub.green',
  badgeTextColor: 'teachHub.white',
};

const ErrorBadgeConfiguration: BadgeConfiguration = {
  badgeBackgroundColor: 'teachHub.red',
  badgeTextColor: 'teachHub.white',
};

const NonExistentBadgeConfiguration: BadgeConfiguration = {
  badgeBackgroundColor: 'teachHub.black',
  badgeTextColor: 'teachHub.white',
};

const WarningBadgeConfiguration: BadgeConfiguration = {
  badgeBackgroundColor: 'teachHub.yellow',
  badgeTextColor: 'teachHub.black',
};

export const getSubmissionMissingStatusConfiguration = () => {
  return {
    text: SubmissionStatus.NonExistent,
    ...NonExistentBadgeConfiguration,
  };
};

export const getSubmissionReviewStatusConfiguration = ({
  submission,
  review,
}: {
  submission: {
    submittedAt: Optional<Nullable<string>>;
    submittedAgainAt: Optional<Nullable<string>>;
  };
  review: {
    reviewedAt: Optional<Nullable<string>>;
    reviewedAgainAt: Optional<Nullable<string>>;
    grade: Optional<Nullable<number>>;
    revisionRequested: Optional<Nullable<boolean>>;
  } | null;
}): SubmissionReviewStatusConfiguration => {
  if (!review) {
    return {
      text: SubmissionStatus.MissingReview,
      ...ErrorBadgeConfiguration,
    };
  }

  const { grade, revisionRequested } = review;

  if (grade) {
    return {
      text: SubmissionStatus.Reviewed,
      ...SuccessBadgeConfiguration,
    };
  } else if (revisionRequested && !submission.submittedAgainAt) {
    return {
      text: SubmissionStatus.NewSubmissionRequested,
      ...WarningBadgeConfiguration,
    };
  } else if (review.reviewedAt && !review.reviewedAgainAt) {
    return {
      text: 'Re-entrega sin corregir',
      ...ErrorBadgeConfiguration,
    };
  } else {
    return {
      text: 'Re-entrega corregida',
      ...SuccessBadgeConfiguration,
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
      badgeBackgroundColor: 'teachHub.gray',
      badgeTextColor: 'teachHub.black',
    };
  }
};
