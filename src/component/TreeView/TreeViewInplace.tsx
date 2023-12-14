import { useState } from "react";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";

const TreeViewInplace = () => {
  const [text, setText] = useState<string>();

  return (
    <div className="card">
      <Inplace closable>
        <InplaceDisplay>{text}</InplaceDisplay>
        <InplaceContent>
          <InputText
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Enter a file name"
          />
        </InplaceContent>
      </Inplace>
    </div>
  );
};

export default TreeViewInplace;
