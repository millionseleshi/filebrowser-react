import { castToSnapshot } from "mobx-state-tree";
import { UserFileStore, UserFile } from "./UserFileModel";
import { when } from "mobx";

it("created user file", (done) => {
  when(() => {
    const userfile = UserFile.create({
      id: "1",
      name: "index1.js",
      relativePath: "src/index1.js",
      code: 'console.log("Hello world!")',
      extension: "js",
    });
    expect(userfile.id).toBe("1");
    done();
  });
});

it("crate array of user file", (done) => {
  when(() => {
    const userfiles = [
      {
        id: "1",
        name: "index1.js",
        relativePath: "src/index1.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
      {
        id: "2",
        name: "index2.js",
        relativePath: "src/index2.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
    ];
    const userFileStore = UserFileStore.create({ userfile: userfiles });
    expect(userFileStore.userfile.length).toBe(userfiles.length);
    done();
  });
});

it("add user file", (done) => {
  when(() => {
    const userfiles = [
      {
        id: "1",
        name: "index1.js",
        relativePath: "src/index1.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
      {
        id: "2",
        name: "index2.js",
        relativePath: "src/index2.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
    ];
    const userFileStore = UserFileStore.create({ userfile: userfiles });
    userFileStore.addUserFile({
      id: "3",
      name: "index3.js",
      relativePath: "src/index3.js",
      code: 'console.log("Hello world!")',
      extension: "js",
    });
    expect(userFileStore.userfile.length).toBe(userfiles.length + 1);
    done();
  })
});

it("remove user file", (done) => {
  when(() => {
    const userfiles = [
      {
        id: "1",
        name: "index1.js",
        relativePath: "src/index1.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
      {
        id: "2",
        name: "index2.js",
        relativePath: "src/index2.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
    ];
    const userFileStore = UserFileStore.create({ userfile: userfiles });
    userFileStore.removeUserFile("1");
    expect(userFileStore.userfile.length).toBe(userfiles.length - 1);
    done();
  })
})

it("get all user file", (done) => {
   
  when(() => {
    const userfiles = [
      {
        id: "1",
        name: "index1.js",
        relativePath: "src/index1.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
      {
        id: "2",
        name: "index2.js",
        relativePath: "src/index2.js",
        code: 'console.log("Hello world!")',
        extension: "js",
      },
    ];
    const userFileStore = UserFileStore.create({ userfile: userfiles });
    const allFiles=userFileStore.loadAllUserFiles()
    expect(allFiles).toEqual(userfiles);
    done();
  })
})