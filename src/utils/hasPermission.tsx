export enum Permission {
  ViewHome = 'viewHome',
  ViewUserProfile = 'viewUserProfile',
  EditUser = 'editUser',
  EditSubject = 'editSubject',
}

export function hasPermission(user: unknown, permission: Permission): boolean {
  return false;
}
