import { TreeViewModel } from "./../treeview/TreeViewModel";
import { UserFile, UserFileStore } from "./../userfile/UserFileModel";
import { SnapshotOrInstance, cast, getSnapshot, types } from "mobx-state-tree";

export const FileViewModel = types
  .model("fileViewModel", {
    userFiles: UserFileStore,
    activeFilesIds: types.array(types.string),
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
      let updateFileCode = self.userFiles.userfile.find(
        (fileid) => fileid.id === activeFileId
      );
      if (updateFileCode) {
        updateFileCode.code = newCode;
      }
      return updateFileCode;
    },

    setFiles: (userfiles: SnapshotOrInstance<typeof UserFile>) => {
      self.userFiles.addUserFile(userfiles);
      self.activeFilesIds.clear();
    },
  }))
  .actions((self) => ({
    openFile: (node: SnapshotOrInstance<typeof TreeViewModel>) => {
      const { id, children } = node;
      if (children) {
        return;
      }

      const { activeFilesIds } = getSnapshot(self);
      if (activeFilesIds.includes(id)) {
        self.setActiveFiles(id);
      }
      self.setEditorActiveFile(id);
    },
    closeFile: (fileToCloseId: string) => {
      const activeFileLength = self.activeFilesIds.length;
      if (activeFileLength === 1) {
        self.setEditorActiveFile(null);
      } else if (
        activeFileLength >= 2 &&
        fileToCloseId === self.editorActiveFileId
      ) {
        const newActiveFile = getNewActiveFileId(
          self.activeFilesIds,
          activeFileLength,
          fileToCloseId
        );
        self.setEditorActiveFile(newActiveFile);
      }
    },
  }))
  .actions((self) => ({
    selectActiveFiles: (activeFileId: string) => {
      if (
        self.activeFilesIds.find((activefile) => activefile === activeFileId)
      ) {
        return self.userFiles.userfile.filter(
          (fileid) => fileid.id === activeFileId
        );
      }
    },
  }))

const getNewActiveFileId = (
  activeFilesIds: string[],
  activeFilesLength: number,
  fileToCloseId: string
) => {
  const fileToBeRemovedIndex = activeFilesIds.indexOf(fileToCloseId);

  if (fileToBeRemovedIndex + 1 === activeFilesLength) {
    return activeFilesIds[fileToBeRemovedIndex - 1];
  }

  return activeFilesIds[fileToBeRemovedIndex + 1];
};
