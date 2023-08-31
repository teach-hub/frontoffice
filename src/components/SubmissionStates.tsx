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
  return (
    <Timeline title="Historial">
      {submission.submittedAt && (
        <TimelineItem icon={CheckIcon}>
          {`${formatAsSimpleDateTime(submission.submittedAt)}`} - Entregado
        </TimelineItem>
      )}
      {review?.reviewedAt && review.revisionRequested && (
        <TimelineItem icon={CheckIcon}>
          {`${formatAsSimpleDateTime(review.reviewedAt)}`} - Re-entrega solicitada
        </TimelineItem>
      )}
      {review?.reviewedAt && !review.revisionRequested && (
        <TimelineItem icon={CheckIcon}>
          {`${formatAsSimpleDateTime(review.reviewedAt)}`} - Corregido
        </TimelineItem>
      )}
      {submission?.submittedAgainAt && (
        <TimelineItem icon={CheckIcon}>
          {`${formatAsSimpleDateTime(submission.submittedAgainAt)}`} - Re-entregado
        </TimelineItem>
      )}
      {review?.reviewedAgainAt && (
        <TimelineItem icon={CheckIcon} skipTrail>
          {`${formatAsSimpleDateTime(review.reviewedAgainAt)}`} - Re-entrega corregida
        </TimelineItem>
      )}
    </Timeline>
  );
}
