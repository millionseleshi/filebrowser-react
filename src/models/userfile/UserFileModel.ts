import { getParent, types } from "mobx-state-tree";

export const userFileStore = types
  .model("userfile", {
    id: types.identifier,
    name: types.string,
    relativePath: types.string,
    code: types.string,
    extension: types.string,
  })
  .views((self) => ({
    get fileview() {
      return getParent(self);
    },
  }));
