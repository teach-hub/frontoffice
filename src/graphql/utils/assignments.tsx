import { useLazyLoadQuery } from 'react-relay';
import { AssignmentQuery } from '../../__generated__/AssignmentQuery.graphql';
import AssignmentQueryDef from '../AssignmentQuery';

export const getAssignment = ({ assignmentId }: { assignmentId: string }) => {
  const data = useLazyLoadQuery<AssignmentQuery>(AssignmentQueryDef, {
    id: assignmentId,
  });

  return data?.findAssignment;
};
