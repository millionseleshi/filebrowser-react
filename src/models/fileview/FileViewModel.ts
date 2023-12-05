import { TreeViewModel } from "../treeview/TreeViewModel";
import { userFileStore } from "./../userfile/UserFileModel";
import { SnapshotOrInstance, cast, types } from "mobx-state-tree";

export const FileViewModel = types
  .model("fileViewModel", {
    userFiles: types.array(userFileStore),
    activeFilesIds: types.optional(types.array(types.string), []),
    editorActiveFileId: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setActiveFiles: (activefileids: string) => {
      self.activeFilesIds.push(activefileids);
    },
    removeActiveFile: (activefileids: string) => {
      self.activeFilesIds = cast(
        self.activeFilesIds.filter(
          (removefileid) => removefileid !== activefileids
        )
      );
    },
    setEditorActiveFile: (editorFileId: string | null) => {
      self.editorActiveFileId = editorFileId;
    },
    updateFileCode: (activeFileId: string, newCode: string) => {
      let updateFileCode = self.userFiles.find(
        (fileid) => fileid.id === activeFileId
      );
      if (updateFileCode) {
        updateFileCode.code = newCode;
      }
      return updateFileCode;
    },
    selectActiveFiles: (activeFileId: string) => {
      if (
        self.activeFilesIds.find((activefile) => activefile === activeFileId)
      ) {
        return self.userFiles.filter((fileid) => fileid.id === activeFileId);
      }
    },
    setFiles: (userfiles: SnapshotOrInstance<typeof userFileStore>) => {
      self.userFiles.push(cast(userfiles));
      self.activeFilesIds.clear();
    },
  }))
  .actions((self) => ({
    openFile: (node: SnapshotOrInstance<typeof TreeViewModel>) => {
      const { id, children } = node;
      if (children) {
        return;
      }

      if (!self.activeFilesIds.includes(id)) {
        self.setActiveFiles(node.id);
      }
      self.setEditorActiveFile(node.id);
    },
  }));
