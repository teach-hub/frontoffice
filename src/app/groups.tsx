import { AssignmentGroupsAndUsersQuery$data } from '__generated__/AssignmentGroupsAndUsersQuery.graphql';
import { filterUsers, UserRoleFilter } from 'app/users';

type CourseType = NonNullable<
  NonNullable<AssignmentGroupsAndUsersQuery$data['viewer']>['course']
>;
type AssignmentType = NonNullable<CourseType['assignments']>[number];
type GroupUserType = NonNullable<
  NonNullable<AssignmentType['groupParticipants']>[number]['user']
>;

export type GroupUsersData = {
  groupId: string;
  groupName: string;
  users: GroupUserType[];
};

type AssignmentGroupsData = {
  groupUsersData: GroupUsersData[];
  studentsNamesWithoutGroup: string[];
};

/**
 * Returns the groups users data for the first assignment received in
 * the query data
 * */
export const getFirstAssignmentGroupsUsersData = ({
  groupAndUsersData,
}: {
  groupAndUsersData: AssignmentGroupsAndUsersQuery$data;
}): AssignmentGroupsData => {
  const course = groupAndUsersData.viewer?.course;
  const selectedAssignment = course?.assignments[0]; // Expect only one assignment

  const groupDataById = new Map<string, GroupUsersData>();
  selectedAssignment?.groupParticipants?.forEach(participant => {
    const groupId = participant.group?.id;
    const groupData = groupDataById.get(groupId);
    if (!groupData) {
      groupDataById.set(groupId, {
        groupId: groupId,
        groupName: participant.group.name || '-',
        users: [],
      });
    }
    groupDataById.get(groupId)?.users.push(participant.user);
  });

  const groupsDataList = Array.from(groupDataById.values());
  const studentsWithGroupIds = groupsDataList.flatMap(x => x.users.map(user => user.id));

  const studentRoles = filterUsers({
    users: course?.userRoles || [],
    roleFilter: UserRoleFilter.Student,
  });

  const studentsWithoutGroup = mapToUserNames(
    studentRoles
      .filter(role => !studentsWithGroupIds.includes(role.user.id))
      .map(role => role.user)
  );

  return {
    groupUsersData: groupsDataList,
    studentsNamesWithoutGroup: studentsWithoutGroup,
  };
};

export const mapToUserNames = (users: GroupUserType[]): string[] => {
  return users
    .map((user): string => `${user.lastName}, ${user.name} (${user.file})`)
    .sort((a: string, b: string) => a.localeCompare(b)); // Sort users alphabetically
};
