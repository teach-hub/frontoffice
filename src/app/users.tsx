export enum UserRoleFilter {
  All = 'all',
  Student = 'student',
  Teacher = 'teacher',
}

interface UserFilterData {
  readonly role: {
    readonly isTeacher: boolean;
  };
}

export const filterUsers = <T extends UserFilterData>({
  users,
  roleFilter,
}: {
  users: readonly T[];
  roleFilter: UserRoleFilter;
}): T[] => {
  return users?.filter(userRole => {
    const userIsTeacher: boolean = userRole?.role.isTeacher || false;

    if (roleFilter === UserRoleFilter.Student) {
      return !userIsTeacher;
    } else if (roleFilter === UserRoleFilter.Teacher) {
      return userIsTeacher;
    }
    return true;
  });
};
