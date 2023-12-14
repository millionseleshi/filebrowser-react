import { SnapshotOrInstance, cast, getSnapshot, types } from "mobx-state-tree";

export const UserFile = types.model("UserFile", {
  id: types.string,
  name: types.string,
  relativePath: types.maybeNull(types.string),
  code: types.maybeNull(types.string),
  extension: types.maybeNull(types.string),
});

export const UserFileStore = types
  .model("UserFileStore", {
    userfile: types.array(UserFile),
  })
  .actions((self) => ({
    addUserFile: (file: SnapshotOrInstance<typeof UserFile>) => {
      self.userfile.push(file);
    },
    removeUserFile: (fileId: string) => {
      self.userfile = cast(self.userfile.filter((file) => file.id !== fileId));
    },
  }))
  .views((self) => ({
    loadAllUserFiles: () => {
      return getSnapshot(self.userfile);
    },
  }));
