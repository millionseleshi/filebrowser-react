import { IAnyModelType, types } from "mobx-state-tree";


export const TreeViewModel = types.model("TreeViewModel", {
    id: types.string,
    name: types.maybeNull(types.string),
    extension: types.maybeNull(types.string),
    children: types.maybe(types.array(types.late((): IAnyModelType => TreeViewModel))),
  })

