import { useLazyLoadQuery } from 'react-relay';

import AssignmentQueryDef from 'graphql/AssignmentQuery';

import type { AssignmentQuery } from '__generated__/AssignmentQuery.graphql';

export const getAssignment = ({ assignmentId }: { assignmentId: string }) => {
  // FIXME
  // eslint-disable-next-line
  const data = useLazyLoadQuery<AssignmentQuery>(AssignmentQueryDef, {
    id: assignmentId,
  });

  return data?.viewer?.assignment;
};
