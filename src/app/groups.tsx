import { AssignmentGroupsAndUsersQuery$data } from '__generated__/AssignmentGroupsAndUsersQuery.graphql';
import { filterUsers, UserRoleFilter } from 'app/users';

type CourseType = NonNullable<
  NonNullable<AssignmentGroupsAndUsersQuery$data['viewer']>['course']
>;
type AssignmentType = NonNullable<CourseType['assignments']>[number];
type GroupUserType = NonNullable<
  NonNullable<AssignmentType['groupParticipants']>[number]['user']
>;

type GroupParticipantData = {
  userRoleId: string;
  user: GroupUserType;
};

export type GroupUsersData = {
  groupId: string;
  groupName: string;
  users: GroupParticipantData[];
};

export type AssignmentGroupsData = {
  groupUsersData: GroupUsersData[];
  studentsWithoutGroup: GroupParticipantData[];
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
    groupDataById.get(groupId)?.users.push({
      userRoleId: participant.userRoleId,
      user: participant.user,
    });
  });

  const groupsDataList = Array.from(groupDataById.values());
  const studentsWithGroupIds = groupsDataList.flatMap(x =>
    x.users.map(user => user.user.id)
  );

  const studentRoles = filterUsers({
    users: course?.userRoles || [],
    roleFilter: UserRoleFilter.Student,
  });

  const studentsWithoutGroup = studentRoles
    .filter(role => !studentsWithGroupIds.includes(role.user.id))
    .map(role => ({
      user: role.user,
      userRoleId: role.id,
    }));

  return {
    groupUsersData: groupsDataList,
    studentsWithoutGroup: studentsWithoutGroup,
  };
};

export const mapToUserName = (participantData: GroupParticipantData): string => {
  return `${participantData.user.lastName}, ${participantData.user.name} (${participantData.user.file})`;
};

export const mapToUserNames = (users: GroupParticipantData[]): string[] => {
  return users.map(mapToUserName).sort((a: string, b: string) => a.localeCompare(b)); // Sort users alphabetically
};
