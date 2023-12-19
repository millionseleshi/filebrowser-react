import { Tree, TreeExpandedKeysType } from "primereact/tree";
import { SetStateAction, useRef, useState } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { MenuItem } from "primereact/menuitem";
import { TreeNode } from "primereact/treenode";
import { v4 as uuidv4 } from "uuid";
import TreeViewInplace from "./TreeViewInplace";
import { observer } from "mobx-react-lite";

const TreeView = observer(() => {
  const [expandedKeys, setExpandedKeys] = useState<TreeExpandedKeysType>({});
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [node, setNode] = useState<TreeNode[]>([
    {
      key: "0",
      label: "root",
      data: "Documents Folder",
      icon: "pi pi-fw pi-folder",
      children: []
    },
  ]);
  const contextMenu = useRef<ContextMenu>(null);

  const TreeContextMenu: MenuItem[] = [
    {
      label: "New File",
      icon: "pi pi-fw pi-file",
      command: () => {
        addFileCommand(selectedNodeKey, node, setNode);
      },
    },
    {
      label: "New Folder",
      icon: "pi pi-fw pi-folder",
      command: () => {
        addFolderCommand(selectedNodeKey, node, setNode);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      command: () => {},
    },
  ];

  return (
    <>
      <ContextMenu model={TreeContextMenu} ref={contextMenu} />

      <div className="card flex justify-content-center bg-white">
        <Tree
          value={node}
          expandedKeys={expandedKeys}
          onToggle={(e) => setExpandedKeys(e.value)}
          contextMenuSelectionKey={selectedNodeKey}
          onContextMenuSelectionChange={(e) => setSelectedNodeKey(e.value)}
          onContextMenu={(e) => contextMenu.current.show(e.originalEvent)}
          className="w-full md:w-40rem"
        />
      </div>
    </>
  );
});
const addFolderCommand = (
  selectedNodeKey: string | null,
  node: TreeNode[],
  setNode: {
    (value: SetStateAction<TreeNode[]>): void;
    (arg0: TreeNode[]): void;
  }
) => {
  console.log("Selcted Node: " + selectedNodeKey);
  let _node = [...node];
  let _selectedNode = _node.find((node) => node.key === selectedNodeKey);
  if (_selectedNode) {
    _selectedNode.children = [
      ...(_selectedNode.children || []),
      {
        key: uuidv4(),
        label: (
          <TreeViewInplace selectedNodeKey={selectedNodeKey} type="folder" />
        ),
        data: "folder",
        icon: "pi pi-fw pi-folder",
        children: [],
      },
    ];
    setNode(_node)
  }
};

const addFileCommand = (
  selectedNodeKey: string | null,
  node: TreeNode[],
  setNode: {
    (value: SetStateAction<TreeNode[]>): void;
    (arg0: TreeNode[]): void;
  }
) => {
  console.log("Selcted Node: " + selectedNodeKey);
  let _node = [...node];
  let _selectedNode = _node.find((node) => node.key === selectedNodeKey);

  if (_selectedNode) {
    _selectedNode.children = [
      ...(_selectedNode.children || []),
      {
        key: uuidv4(),
        label: (
          <TreeViewInplace selectedNodeKey={selectedNodeKey} type="file" />
        ),
        data: "file",
        icon: "pi pi-fw pi-file",
      },
    ];
    setNode(_node);
  }
};
export default TreeView;
