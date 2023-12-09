import { cast, getSnapshot, types } from "mobx-state-tree";
import { TreeViewModel } from "./TreeViewModel";
import { when } from "mobx";
import { v4 as uuidv4 } from "uuid";

it("should create tree view model", (done) => {
  when(() => {
    const node = { id: "1", children: [{ id: "2" }] };
    const treeView = TreeViewModel.create(node);
    expect(treeView.id).toBe("1");
  });
  done();
});