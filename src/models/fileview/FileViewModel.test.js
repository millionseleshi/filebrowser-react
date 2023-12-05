import { userFileStore } from "../userfile/UserFileModel";
import { FileViewModel } from "./FileViewModel";
import { when } from "mobx";
const userfileOne = {
  id: "1",
  name: "index1.js",
  relativePath: "src/index1.js",
  code: 'console.log("Hello world!")',
  extension: "js",
};
const userfileTwo = {
  id: "2",
  name: "index2.js",
  relativePath: "src/index2.js",
  code: 'console.log("Hello world!")',
  extension: "js",
};
const activefilesids = ["1", "2"];
const editoractivefileid = "2";

it("should created file view", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    expect(fileView.activeFilesIds.length).toBe(activefilesids.length);
    expect(fileView.editorActiveFileId).toBe(editoractivefileid);
    expect(fileView.userFiles.find((fileid) => fileid.id === fileOne.id)).toBe(
      fileOne
    );
    done();
  });
});

it("should add active files id when setActiveFiles", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    fileView.setActiveFiles("3");
    expect(fileView.activeFilesIds.length).toBe(activefilesids.length + 1);
    done();
  });
});

it("should remove active file id when removeActiveFile", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    fileView.removeActiveFile("1");
    expect(fileView.activeFilesIds.length).toBe(activefilesids.length - 1);
    done();
  });
});

it("should set the editor's active file id when the action is setEditorActiveFile", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    fileView.setEditorActiveFile("4");
    expect(fileView.editorActiveFileId).toBe("4");
    done();
  });
});

it("should update the code of a file when the action is updateFileCode", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    const newCode = `const message="Hello world!"`;
    const updateFileId = "1";

    fileView.updateFileCode(updateFileId, newCode);
    expect(fileView.updateFileCode(updateFileId, newCode).code).toBe(newCode);
    done();
  });
});

it("shouldn't update the code of a file when the action is updateFileCode if id doesn't exist", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    const newCode = `const message ="Hello world!" `;
    const updateFileId = "3";

    fileView.updateFileCode(updateFileId, newCode);
    const fileTobeUpdated = fileView.userFiles.find(
      (filedId) => filedId.id === updateFileId
    );
    expect(fileTobeUpdated).toBeUndefined();
    done();
  });
});

it("should select file given active id when selectActiveFiles", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    const activeFile = fileView.selectActiveFiles(fileOne.id);
    expect(activeFile).toContain(fileOne);
    done();
  });
});

it("should set user files when the action is setFiles", (done) => {
  when(() => {
    const fileOne = userFileStore.create(userfileOne);
    const fileTwo = userFileStore.create(userfileTwo);
    const fileView = FileViewModel.create({
      userFiles: [fileOne, fileTwo],
      activeFilesIds: activefilesids,
      editorActiveFileId: editoractivefileid,
    });
    const userFiles = {
      id: "3",
      name: "component.js",
      relativePath: "src/component.js",
      code: 'console.log("hello world")',
      extension: ".js",
    };

    fileView.setFiles(userFileStore.create(userFiles));
    expect(fileView.userFiles).toContainEqual(userFiles);
    done();
  });
});
