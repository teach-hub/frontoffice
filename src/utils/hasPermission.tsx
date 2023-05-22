export enum Permission {
  ViewHome = 'viewHome',
  ViewUserProfile = 'viewUserProfile',
  EditUser = 'editUser',
  EditSubject = 'editSubject',
}

type User = {
  id: string;
  file: string;
  lastName: string;
  name: string;
  notificationEmail: string;
};

export function hasPermission(user: unknown, permission: Permission): boolean {
  return false;
}
