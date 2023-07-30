import Badge from 'components/Badge';
import React from 'react';
import { SubmissionReviewStatusConfiguration } from 'app/submissions';

export const ReviewStatusBadge = ({
  reviewStatusConfiguration,
}: {
  reviewStatusConfiguration: SubmissionReviewStatusConfiguration;
}) => {
  return (
    <Badge
      fontSize="md"
      fontWeight="bold"
      backgroundColor={reviewStatusConfiguration.badgeBackgroundColor}
      color={reviewStatusConfiguration.badgeTextColor}
    >
      {reviewStatusConfiguration.text}
    </Badge>
  );
};
