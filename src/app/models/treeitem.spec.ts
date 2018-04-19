import { Treeview, ITreeview } from "./treeview";
import { TestData } from "../components/treeitem/treeitem.component.spec";
import { ITreeItem } from "./treeitem";
import { StateManagerMock } from "./treeview.spec";
import { IStateManager } from "../helpers/statemanager";

describe("models/treeitem", () => {

  let _stateManager: IStateManager = null;
  let _treeview: ITreeview = null;
  let _treeitem: ITreeItem = null;

  let _setup: () => void = () => {
    _stateManager = new StateManagerMock();
    spyOn(_stateManager, "SetValue");    
    _treeview = new Treeview("someID", TestData, _stateManager);
    _treeitem = _treeview.TreeItems[0];
  };

  let _teardown: () => void = () => {
    _stateManager = null;
    _treeview = null;
    _treeitem = null;
  };

  let _givenState: (collapsed: boolean, expandedNodes: number[]) => void = (collapsed: boolean, expandedNodes: number[]) => {
    spyOn(_stateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        return property === _treeview.CacheProperties.AllCollapsed ? collapsed : expandedNodes;
      });
    _treeview = new Treeview("someID", TestData, _stateManager);
    _treeitem = _treeview.TreeItems[0];
  };

  let _whenToggleNode: () => void = () => {
    _treeitem.ToggleNode();
  };

  beforeEach(_setup);
  afterEach(_teardown);

  it("should be instantiated", () => {
    expect(_treeitem).toBeTruthy();
  });

  it("should have title", () => {
    expect(_treeitem.Title).toBe(TestData[0].Title);
  });

  it("should have children", () => {
    expect(_treeitem.HasChildren).toBe(true);
    expect(_treeitem.Children.length).toBe(2);
  });

  it("should be collapsed by default", () => {
    expect(_treeitem.Collapsed).toBe(true);
  });

  it("should not be collapsed if tree is expanded", () => {
    _givenState(false, []);
    expect(_treeitem.Collapsed).toBe(false);
  });

  it("should not be collapsed if tree is collapsed but node is cached", () => {
    _givenState(true, [1]);
    expect(_treeitem.Collapsed).toBe(false);
  });

  it("should be collapsed if tree is expanded but node is cached", () => {
    _givenState(false, [1]);
    expect(_treeitem.Collapsed).toBe(true);
  });

  describe("ToggleNode", () => {

    it("should toggle collapsed", () => {
      expect(_treeitem.Collapsed).toBe(true);
      _whenToggleNode();
      expect(_treeitem.Collapsed).toBe(false);
      _whenToggleNode();
      expect(_treeitem.Collapsed).toBe(true);
    });

    it("should cache state", () => {
      _whenToggleNode();
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _treeview.CacheProperties.CachedNodes, [1]);
      _whenToggleNode();
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _treeview.CacheProperties.CachedNodes, []);
    });

  });

});