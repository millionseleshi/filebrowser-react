import { useState } from "react";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useMst } from "../../hooks/RootStore";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react";

interface TreeViewInplaceProps {
  selectedNodeKey: string | null;
  type: "file" | "folder";
}

const TreeViewInplace = observer(
  ({ selectedNodeKey, type }: TreeViewInplaceProps) => {
    const [text, setText] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { userFile } = useMst();
    if (type === "file") {
      const [fileNameError, setFileNameError] = useState<boolean>(false);
      const setFileName = (fileName: string) => {
        if (fileName.trim() === "") {
          setErrorMessage("File name cannot be empty");
        } else if (checkIsFile(fileName) === true) {
          setText(fileName);
          setFileNameError(false);
          createNewFileOrFolder(userFile, fileName, selectedNodeKey, type);
        } else {
          setErrorMessage("invalid file extension");
          setFileNameError(true);
        }
      };

      return createNewFileNode(text, setFileName, fileNameError, errorMessage);
    }
    if (type === "folder") {
      const [folderNameError, setFolderNameError] = useState<boolean>(false);
      const setFolderName = (folderName: string) => {
        if (folderName.trim() === "") {
          setFolderNameError(true);
          setErrorMessage("Folder name cannot be empty");
        } else if (checkIsFolder(folderName) === true) {
          setFolderNameError(false);
          setText(folderName);
          createNewFileOrFolder(userFile, folderName, selectedNodeKey, type);
        } else {
          setFolderNameError(true);
          setErrorMessage("Folder name cannot have extension");
        }
      };
      return createNewFolderNode(
        text,
        setFolderName,
        folderNameError,
        errorMessage
      );
    }
  }
);

const createNewFolderNode = (
  text: string | undefined,
  setFolderName: (folderName: string) => void,
  folderNameError: boolean,
  errorMessage: string
) => {
  return (
    <div className="col-span-4">
      <Inplace closable>
        <InplaceDisplay>{text || "New folder"}</InplaceDisplay>
        <InplaceContent>
          <InputText
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
          />
        </InplaceContent>
      </Inplace>
      {folderNameError && <Message severity="warn" text={errorMessage} />}
    </div>
  );
};

const createNewFileNode = (
  text: string | undefined,
  setFileName: (fileName: string) => void,
  fileNameError: boolean,
  errorMessage: string
) => {
  return (
    <div className="col-span-4">
      <Inplace closable>
        <InplaceDisplay>{text || "new file"}</InplaceDisplay>
        <InplaceContent>
          <InputText
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />
        </InplaceContent>
      </Inplace>
      {fileNameError && <Message severity="warn" text={errorMessage} />}
    </div>
  );
};

const createNewFileOrFolder = (
  userFile,
  fileName: string,
  selectedNodeKey: string | null,
  type: string
) => {
  userFile.addUserFile({
    id: uuidv4(),
    name: fileName,
    extension: inputExtension(fileName),
    relativePath: selectedNodeKey,
    type: type,
  });
};

const inputExtension = (fileName: string) => {
  return fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
};

const supportedFile = [
  ".txt",
  ".text",
  ".js",
  ".ts",
  ".json",
  ".html",
  ".css",
  ".scss",
  ".php",
  ".py",
];
const checkIsFile = (fileName: string): boolean => {
  const fileExtension = inputExtension(fileName);
  return supportedFile.includes(fileExtension);
};

const checkIsFolder = (name: string): boolean => {
  const hasExtension = /\..+$/.test(name);
  return !hasExtension;
};

export default TreeViewInplace;
