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
      data: "folder",
      icon: "pi pi-fw pi-folder",
      children: [],
    },
  ]);
  const contextMenu = useRef<ContextMenu>(null);

  const TreeContextMenu: MenuItem[] = [
    {
      label: "New File",
      icon: "pi pi-fw pi-file",
      command: () => {
        addFileCommand(selectedNodeKey!, node, setNode);
      },
    },
    {
      label: "New Folder",
      icon: "pi pi-fw pi-folder",
      command: () => {
        node.forEach((n: any) => {
          addSubFolder(n, selectedNodeKey!);
        });
        setNode([...node]);
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

const addSubFolder = (node: any, selectedNodeKey: string) => {
  if (node.key === selectedNodeKey && node.data === "folder") {
    node.children?.push({
      data: "folder",
      key: uuidv4(),
      label: (
        <TreeViewInplace selectedNodeKey={selectedNodeKey} type="folder" />
      ),
      icon: "pi pi-fw pi-folder",
      children: [],
    });
    return;
  }
  node.children?.forEach((child: any) => {
    addSubFolder(child, selectedNodeKey);
  });
};

const addFileCommand = (
  selectedNodeKey: string,
  nodes: TreeNode[],
  setNode: {
    (value: SetStateAction<TreeNode[]>): void;
    (arg0: TreeNode[]): void;
  }
) => {
  const traverse = (nodes: any) => {
    for (let node of nodes) {
      if (node.key === selectedNodeKey) {
        if (node.data === "folder") {
          node.children.push({
            key: uuidv4(),
            label: (
              <TreeViewInplace selectedNodeKey={selectedNodeKey} type="file" />
            ),
            data: "file",
            icon: "pi pi-fw pi-file",
          });
        } else {
          console.log("Files can only be created under folders.");
        }
        return;
      }

      if (node.children) {
        traverse(node.children);
      }
    }
  };
  traverse(nodes);
  setNode([...nodes]);
};
export default TreeView;
