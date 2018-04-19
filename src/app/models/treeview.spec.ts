import { TreeviewComponent } from "../components/treeview/treeview.component";
import { TreeItemComponent } from "../components/treeitem/treeitem.component";
import { Treeview, ITreeview } from "./treeview";
import { TestData } from "../components/treeitem/treeitem.component.spec";
import { IStateManager } from "../helpers/statemanager";

describe("models/treeview", () => {

  let _stateManager: IStateManager = null;
  let _treeview: ITreeview = null;
  let _thenResult: any = null;

  let _setup: () => void = () => {
    _stateManager = new StateManagerMock();
    spyOn(_stateManager, "SetValue");
    _treeview = new Treeview("someID", TestData, _stateManager);
  };

  let _teardown: () => void = () => {
    _stateManager = null;
    _treeview = null;
    _thenResult = null;
  };

  let _givenState: (collapsed: boolean, expandedNodes: number[]) => void = (collapsed: boolean, expandedNodes: number[]) => {
    spyOn(_stateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        return property === _treeview.CacheProperties.AllCollapsed ? collapsed : expandedNodes;
      });
    _treeview = new Treeview("someID", TestData, _stateManager);
  };

  let _whenToggleAll: () => void = () => {
    _treeview.ToggleAll();
  };

  let _whenIsNodeCollapsed: (treeKey: number) => void = (treeKey: number) => {
    _thenResult = _treeview.IsNodeCollapsed(treeKey);
  };

  beforeEach(_setup);
  afterEach(_teardown);

  it("should be instantiated", () => {
    expect(_treeview).toBeTruthy();
  });

  it("should build tree", () => {
    expect(_treeview.TreeItems.length).toBe(4);
    expect(_treeview.TreeItems[0].Children.length).toBe(2);
  });

  it("should be collapsed by default", () => {
    expect(_treeview.Collapsed).toBe(true);
  });

  it("should not be collapsed if tree is expanded", () => {
    _givenState(false, []);
    expect(_treeview.Collapsed).toBe(false);
  });

  describe("ToggleAll", () => {

    it("should expand/collapse tree", () => {
      _whenToggleAll();
      expect(_treeview.Collapsed).toBe(false);
      _whenToggleAll();
      expect(_treeview.Collapsed).toBe(true);
    });

    it("should save state in cache", () => {
      _whenToggleAll();
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _treeview.CacheProperties.AllCollapsed, false);
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _treeview.CacheProperties.CachedNodes, []);
    });

  });

  describe("IsNodeCollapsed", () => {

    it("should get expanded nodes from cache", () => {
      _givenState(true, [1]);
      _whenIsNodeCollapsed(1);
      expect(_stateManager.GetValue).toHaveBeenCalledWith(_treeview.ID, _treeview.CacheProperties.CachedNodes, []);
    });

    it("should return true by default", () => {
      _whenIsNodeCollapsed(1);
      expect(_thenResult).toBe(true);
    });

    it("should return false if node is expanded", () => {
      _givenState(true, [1]);
      _whenIsNodeCollapsed(1);
      expect(_thenResult).toBe(false);
    });

    it("should return false if tree is expanded", () => {
      _givenState(false, []);
      _whenIsNodeCollapsed(1);
      expect(_thenResult).toBe(false);
    });

  });

});

export class StateManagerMock implements IStateManager {
  GlobalScope: Window;
  CurrentState: any;
  GetValue(controlID: string, property: string, defaultValue: any) : any {
    return defaultValue;
  };
  SetValue(controlID: string, property: string, value: any) : void {};
}