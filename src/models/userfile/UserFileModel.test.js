import { userFileStore } from "./UserFileModel";
import { when } from "mobx";

it("created user file", (done) => {
  when(() => {
    const fileView = userFileStore.create( 
        {
          id: "1",
          name: "index1.js",
          relativePath: "src/index1.js",
          code: 'console.log("Hello world!")',
          extension: "js",
        },
    );
    expect(fileView.id).toBe("1");
    done();
  });
});
