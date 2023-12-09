import {
  types,
  IAnyModelType,
  SnapshotOrInstance,
} from "mobx-state-tree";
import { UserFileStore } from "../userfile/UserFileModel";
import{v4 as uuidv4} from "uuid"

export const TreeViewModel = types
  .model("TreeViewModel", {
    id: types.string,
    name: types.optional(types.string,"root"),
    extension: types.maybeNull(types.string),
    children: types.array(types.late(() :IAnyModelType=> TreeViewModel)),
  }).actions((self)=>({
    addFile(file: SnapshotOrInstance<typeof UserFileStore>) {
        self.id=uuidv4()
        self.children.push(file.userfile)
    },
  }))
 