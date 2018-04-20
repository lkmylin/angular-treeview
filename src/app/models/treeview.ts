import { IStateManager } from "@lkmylin/angular-statemanager";
import { ITreeItemPartial, ITreeItem, TreeItem } from "./treeitem";

export interface ITreeview {
  ID: string;
  Collapsed: boolean;
  TreeItems: Array<ITreeItem>;
  StateManager: IStateManager;
  ToggleAll(): void;
  IsNodeCollapsed(treeKey: number): boolean;
  CacheProperties: TreeviewCacheProperties;
}

export class Treeview implements ITreeview {
    ID: string;
    TreeItems: Array<ITreeItem>;
    Collapsed: boolean;
    StateManager: IStateManager;
    CacheProperties: TreeviewCacheProperties = new TreeviewCacheProperties();
    ToggleAll(): void {
      const context = this;
      const toggleChildren = (items : Array<ITreeItem>) => {
        items.forEach(item => {
          item.Collapsed = context.Collapsed;
          toggleChildren(item.Children);
        });
      };
      context.Collapsed = !context.Collapsed;      
      context.StateManager.SetValue(context.ID, context.CacheProperties.AllCollapsed, context.Collapsed);
      context.StateManager.SetValue(context.ID, context.CacheProperties.CachedNodes, []);
      toggleChildren(context.TreeItems);
    };
    IsNodeCollapsed(treeKey: number): boolean {
      const cachedNodes = this.StateManager.GetValue(this.ID, this.CacheProperties.CachedNodes, []);
      if (cachedNodes.length === 0) return this.Collapsed;
      const filteredExpandedNodes = cachedNodes.filter((tk: number) => tk === treeKey);
      return filteredExpandedNodes.length === 0 ? this.Collapsed : !this.Collapsed;
    };
    constructor (id: string, items : Array<ITreeItemPartial>, stateManager: IStateManager) {
      const context = this;
      context.ID = id;
      context.TreeItems = [];
      context.Collapsed = stateManager.GetValue(id, context.CacheProperties.AllCollapsed, true);
      context.StateManager = stateManager;
      items.forEach(item => {
        if (item.ParentKey === 0) {
          context.TreeItems[context.TreeItems.length] = new TreeItem(item, items, context);
        }
      });
    }
}

export class TreeviewCacheProperties {
  AllCollapsed: string = "AllCollapsed";
  CachedNodes: string = "CachedNodes";
}