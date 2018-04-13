import { ITreeview } from "./treeview";

export interface ITreeItemPartial {
  TreeKey: number;
  ParentKey: number;
  Title: string;
}

export interface ITreeItem extends ITreeItemPartial {
  RootScope: ITreeview;
  Collapsed: boolean;
  HasChildren: boolean;
  Children: Array<ITreeItem>;
  ToggleNode: () => void;
}

export class TreeItem implements ITreeItem {

  RootScope: ITreeview;
  TreeKey: number;
  ParentKey: number;
  Title: string;
  HasChildren: boolean;
  Collapsed: boolean;
  Children: Array<ITreeItem>;
  ToggleNode(): void {
    const context = this;
    context.Collapsed = !context.Collapsed;
    var expandedNodes = context.RootScope.StateManager.GetValue(context.RootScope.ID, context.RootScope.StateManager.CachedProperties.ExpandedNodes, []);
    expandedNodes = expandedNodes.filter((tk: number) => tk !== context.TreeKey);
    if (!context.Collapsed) {
      expandedNodes[expandedNodes.length] = context.TreeKey;
    }
    context.RootScope.StateManager.SetValue(context.RootScope.ID, context.RootScope.StateManager.CachedProperties.ExpandedNodes, expandedNodes);
  };

  constructor(item: ITreeItemPartial, items: Array<ITreeItemPartial>, rootScope: ITreeview) {
    const context = this;
    context.RootScope = rootScope;
    context.TreeKey = item.TreeKey;
    context.ParentKey = item.ParentKey;
    context.Title = item.Title;
    context.Collapsed = rootScope.IsNodeCollapsed(item.TreeKey);
    context.HasChildren = false;
    context.Children = [];
    items.forEach(i => {
      if (i.ParentKey === item.TreeKey) {
        context.HasChildren = true;
        context.Children[context.Children.length] = new TreeItem(i, items, rootScope);
      }
    });
  }

}