import { useRef, useState } from "react";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

const TreeViewInplace = () => {
  const [text, setText] = useState<string>();
  const [fileNameError, setFileNameError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setFileName = (fileName: string) => {
    if (fileName.trim() === "") {
      setErrorMessage("File name cannot be empty");
      setFileNameError(true);
    } else if (checkFileExtension(fileName) === true) {
      setText(fileName);
      setFileNameError(false);
    } else {
      setErrorMessage(
        ".txt, .text, .js, .ts files are allowed"
      );
      setFileNameError(true);
    }
  };

  return (
    <div className="col-span-4">
      <Inplace closable>
        <InplaceDisplay>{text || "FileName"}</InplaceDisplay>
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
};

const checkFileExtension = (fileName: string): boolean => {
  const validExtensions = [".txt", ".text", ".js", ".ts"];
  const fileExtension = fileName
    .substring(fileName.lastIndexOf("."))
    .toLowerCase();

  return validExtensions.includes(fileExtension);
};

export default TreeViewInplace;
