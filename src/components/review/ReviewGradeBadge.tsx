import Badge from 'components/Badge';
import React from 'react';
import { BadgeConfiguration } from 'app/submissions';
import { Nullable, Optional } from 'types';

export const ReviewGradeBadge = ({
  gradeConfiguration,
  grade,
}: {
  gradeConfiguration: BadgeConfiguration;
  grade: Optional<Nullable<number>>;
}) => {
  return (
    <Badge
      fontSize="xl"
      fontWeight="bold"
      backgroundColor={gradeConfiguration.badgeBackgroundColor}
      color={gradeConfiguration.badgeTextColor}
      w="30px"
    >
      {`${grade || '-'}`}
    </Badge>
  );
};
