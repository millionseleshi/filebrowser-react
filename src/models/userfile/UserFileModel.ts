import { types } from "mobx-state-tree";

export const UserFile = types.model("UserFile", {
  id: types.identifier,
  name: types.string,
  relativePath: types.string,
  code: types.string,
  extension: types.string,
});

export const UserFileStore = types.model("UserFileStore", {
  userfile: types.array(UserFile),
});
