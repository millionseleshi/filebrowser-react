import { useState } from "react";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useMst } from "../../hooks/RootStore";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react";

interface TreeViewInplaceProps {
  selectedNodeKey: string | null;
}

const TreeViewInplace = observer(
  ({ selectedNodeKey }: TreeViewInplaceProps) => {
    const [text, setText] = useState<string>();
    const [fileNameError, setFileNameError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { userFile } = useMst();

    const setFileName = (fileName: string) => {
      if (fileName.trim() === "") {
        setErrorMessage("File name cannot be empty");
      } else if (checkFileExtension(fileName) === true) {
        setText(fileName);
        setFileNameError(false);
        setFileNameError(false);
        createNewFile(userFile, fileName, selectedNodeKey);
      } else {
        setErrorMessage(".txt, .text, .js, .ts files are allowed");
        setFileNameError(true);
      }
    };

    return (
      <div className="col-span-4">
        <Inplace closable>
          <InplaceDisplay>{text ?? "FileName"}</InplaceDisplay>
          <InplaceContent>
            <InputText
              onBlur={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
            />
          </InplaceContent>
        </Inplace>
        {fileNameError && <Message severity="warn" text={errorMessage} />}
      </div>
    );
  }
);

function createNewFile(userFile, fileName: string, selectedNodeKey: string | null) {
  userFile.addUserFile({
    id: uuidv4(),
    name: fileName,
    extension: inputFileNameExtension(fileName),
    relativePath: selectedNodeKey,
  });
}

function inputFileNameExtension(fileName: string) {
  return fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
}

const checkFileExtension = (fileName: string): boolean => {
  const validExtensions = [".txt", ".text", ".js", ".ts"];
  const fileExtension = inputFileNameExtension(fileName);

  return validExtensions.includes(fileExtension);
};

export default TreeViewInplace;
