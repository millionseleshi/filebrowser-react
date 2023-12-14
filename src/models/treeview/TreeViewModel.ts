import { IAnyModelType, types } from "mobx-state-tree";

export const TreeViewModel = types
  .model("TreeViewModel", {
    id: types.string,
    name: types.optional(types.string,"root"),
    children: types.array(types.late(() :IAnyModelType=> TreeViewModel)),
  })