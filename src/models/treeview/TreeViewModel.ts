import { IAnyModelType, types } from "mobx-state-tree";


export const TreeViewModel = types.model("TreeViewModel", {
    id: types.string,
    name: types.string,
    extension: types.maybeNull(types.string),
    children: types.maybe(types.late((): IAnyModelType => TreeViewModel)),
  })

