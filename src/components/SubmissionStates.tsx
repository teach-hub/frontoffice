import { Timeline, TimelineItem } from 'components/Timeline';

import { formatAsSimpleDateTime } from 'utils/dates';
import { CheckIcon } from '@chakra-ui/icons';

import type { Nullable, Optional } from 'types';

type Props = {
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
};

export default function SubmissionStates({ submission, review }: Props) {
  const wasSubmitted = !!submission?.submittedAt;
  const wasReviewed = !!review?.reviewedAt;
  const wasSubmittedAgain = !!submission?.submittedAgainAt;
  const wasReviewedAgain = !!review?.reviewedAgainAt;

  return (
    <Timeline title="Historial">
      {wasSubmitted && (
        <TimelineItem icon={CheckIcon} skipTrail={!wasReviewed}>
          {`${formatAsSimpleDateTime(submission.submittedAt!)}`} - Entregado
        </TimelineItem>
      )}
      {wasReviewed && (
        <TimelineItem icon={CheckIcon} skipTrail={wasSubmittedAgain}>
          {`${formatAsSimpleDateTime(review.reviewedAt!)}`} -{' '}
          {review.revisionRequested ? 'Re-entrega solicitada' : 'Corregido'}:
        </TimelineItem>
      )}
      {wasSubmittedAgain && (
        <TimelineItem icon={CheckIcon} skipTrail={wasReviewedAgain}>
          {`${formatAsSimpleDateTime(submission.submittedAgainAt!)}`} - Re-entregado
        </TimelineItem>
      )}
      {wasReviewedAgain && (
        <TimelineItem icon={CheckIcon} skipTrail>
          {`${formatAsSimpleDateTime(review.reviewedAgainAt!)}`} - Re-entrega corregida
        </TimelineItem>
      )}
    </Timeline>
  );
}
