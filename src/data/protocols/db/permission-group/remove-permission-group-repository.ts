export interface RemovePermissionGroupRepository {
  remove: (permissionGroupId: string) => Promise<number>
}
