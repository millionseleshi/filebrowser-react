import { UserFileStore } from "../userfile/UserFileModel";
import { FileViewModel } from "./FileViewModel";
import { when } from "mobx";
const userfiles = [
  {
    id: "1",
    name: "index1.js",
    relativePath: "src/index1.js",
    code: 'console.log("Hello world!")',
    extension: "js",
    type: "file",
  },
  {
    id: "2",
    name: "index2.js",
    relativePath: "src/index2.js",
    code: 'console.log("Hello world!")',
    extension: "js",
    type: "file",
  },
];
const activefilesids = ["1", "2"];
const editoractivefileid = "2";

it("should created file view", (done) => {
  when(() => {
    const fileView = createFileView();
    expect(fileView.activeFilesIds.length).toBe(activefilesids.length);
    expect(fileView.editorActiveFileId).toBe(editoractivefileid);
    expect(fileView.userFiles.userfile.length).toBe(userfiles.length);
    done();
  });
});

describe("file viewer operations", () => {
  it("should add active files id when setActiveFiles", (done) => {
    when(() => {
      const fileView = createFileView();
      fileView.setActiveFiles("3");
      expect(fileView.activeFilesIds.length).toBe(activefilesids.length + 1);
      done();
    });
  });

  it("should remove active file id when removeActiveFile", (done) => {
    when(() => {
      const fileView = createFileView();
      fileView.removeActiveFile("1");
      expect(fileView.activeFilesIds.length).toBe(activefilesids.length - 1);
      done();
    });
  });

  it("should set the editor's active file id when the action is setEditorActiveFile", (done) => {
    when(() => {
      const fileView = createFileView();
      fileView.setEditorActiveFile("4");
      expect(fileView.editorActiveFileId).toBe("4");
      done();
    });
  });

  it("should update the code of a file when the action is updateFileCode", (done) => {
    when(() => {
      const fileView = createFileView();
      const newCode = `const message="Hello world!"`;
      const updateFileId = "1";

      fileView.updateFileCode(updateFileId, newCode);
      expect(fileView.updateFileCode(updateFileId, newCode).code).toBe(newCode);
      done();
    });
  });

  it("shouldn't update the code of a file when the action is updateFileCode if id doesn't exist", (done) => {
    when(() => {
      const fileView = createFileView();
      const newCode = `const message ="Hello world!" `;
      const updateFileId = "3";

      fileView.updateFileCode(updateFileId, newCode);
      const fileTobeUpdated = fileView.userFiles.userfile.find(
        (filedId) => filedId.id === updateFileId
      );
      expect(fileTobeUpdated).toBeUndefined();
      done();
    });
  });

  it("should select file given active id when selectActiveFiles", (done) => {
    when(() => {
      const fileView = createFileView();
      const activeFile = fileView.selectActiveFiles("1");
      expect(activeFile.length).toBe(userfiles.length - 1);
      done();
    });
  });

  it("should set user files when the action is setFiles", (done) => {
    when(() => {
      const fileView = createFileView();
      const userFiles = {
        id: "3",
        name: "component.js",
        relativePath: "src/component.js",
        code: 'console.log("hello world")',
        extension: ".js",
        type: "file",
      };

      fileView.setFiles(userFiles);
      expect(fileView.userFiles.userfile.length).toBe(userfiles.length + 1);
      done();
    });
  });
});

describe("open and close operation on the file", () => {
  it("should not open a node if it has children", (done) => {
    when(() => {
      const node = { id: "1", children: [{ id: "2" }] };
      const fileView = createFileView();
      fileView.openFile(node);
      const mockCallback = jest.fn(fileView.setActiveFiles(node.id));
      expect(mockCallback.mock.calls).toHaveLength(0);
      done();
    });
  });

  it("should open the node if it is not already opened'", (done) => {
    when(() => {
      const node = { id: "1" };
      const files = UserFileStore.create({ userfile: userfiles });
      const fileView = FileViewModel.create({
        userFiles: files,
        activeFilesIds: [],
        editorActiveFileId: editoractivefileid,
      });
      fileView.openFile(node);
      expect(fileView.editorActiveFileId).toBe(node.id);
      done();
    });
  });

  it("should open the node if it is already opened", (done) => {
    when(() => {
      const node = { id: "6" };
      const files = UserFileStore.create({ userfile: userfiles });
      const fileView = FileViewModel.create({
        userFiles: files,
        activeFilesIds: ["6"],
        editorActiveFileId: editoractivefileid,
      });
      fileView.openFile(node);
      expect(fileView.activeFilesIds).toContain(node.id);
      expect(fileView.editorActiveFileId).toBe(node.id);
      done();
    });
  });

  it("should close the only active file", (done) => {
    when(() => {
      const files = UserFileStore.create({ userfile: userfiles });
      const fileView = FileViewModel.create({
        userFiles: files,
        activeFilesIds: ["6"],
        editorActiveFileId: "6",
      });
      fileView.closeFile("6");
      expect(fileView.editorActiveFileId).not.toBe(6);
      done();
    });
  });
  describe("when there are 2 or more active files", () => {
    it("should remove the other files if we are not closing the editor active file", (done) => {
      when(() => {
        const files = UserFileStore.create({ userfile: userfiles });
        const fileView = FileViewModel.create({
          userFiles: files,
          activeFilesIds: ["6", "7"],
          editorActiveFileId: "6",
        });
        fileView.closeFile("6");
        expect(fileView.editorActiveFileId).not.toBe("6");
        done();
      });
    });
    it("should remove the editor active file id and set the new editor active file id to be the one on the right", (done) => {
      when(() => {
        const files = UserFileStore.create({ userfile: userfiles });
        const fileView = FileViewModel.create({
          userFiles: files,
          activeFilesIds: ["6", "7"],
          editorActiveFileId: "6",
        });
        fileView.closeFile("6");
        expect(fileView.editorActiveFileId).toBe("7");
        done();
      });
    });
    it("should remove the editor active file id and set the new editor active file id to be the one on the left", (done) => {
      when(() => {
        const files = UserFileStore.create({ userfile: userfiles });
        const fileView = FileViewModel.create({
          userFiles: files,
          activeFilesIds: ["6", "7"],
          editorActiveFileId: "7",
        });
        fileView.closeFile("7");
        expect(fileView.editorActiveFileId).toBe("6");
        done();
      });
    });
  });
});

const createFileView = () => {
  const files = UserFileStore.create({ userfile: userfiles });
  const fileView = FileViewModel.create({
    userFiles: files,
    activeFilesIds: activefilesids,
    editorActiveFileId: editoractivefileid,
  });
  return fileView;
};
