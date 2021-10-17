export interface RemovePermissionGroup {
  remove: (partnerId: string) => Promise<number>
}
