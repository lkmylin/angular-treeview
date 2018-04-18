import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeviewComponent } from "../components/treeview/treeview.component";
import { TreeItemComponent } from "../components/treeitem/treeitem.component";
import { Treeview, ITreeview, IStateManager } from "./treeview";
import { TestData } from "../components/treeitem/treeitem.component.spec";
import { ITreeItem } from "./treeitem";
import { StateManagerMock } from "./treeview.spec";

describe("models/treeitem", () => {

  let _stateManager: IStateManager = null;
  let _treeview: ITreeview = null;
  let _treeitem: ITreeItem = null;

  let _setup: (additionalAction: () => void) => void = (additionalAction: () => void) => {
    _stateManager = new StateManagerMock();
    spyOn(_stateManager, "SetValue");
    additionalAction();
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
        return property === _stateManager.CachedProperties.AllCollapsed ? collapsed : expandedNodes;
      });
  };

  let _whenToggleNode: () => void = () => {
    _treeitem.ToggleNode();
  };

  it("should be instantiated", () => {
    _setup(() => {});
    expect(_treeitem).toBeTruthy();
    _teardown();
  });

  it("should have title", () => {
    _setup(() => {});
    expect(_treeitem.Title).toBe(TestData[0].Title);
    _teardown();
  });

  it("should have children", () => {
    _setup(() => {});
    expect(_treeitem.HasChildren).toBe(true);
    expect(_treeitem.Children.length).toBe(2);
    _teardown();
  });

  it("should be collapsed by default", () => {
    _setup(() => {});
    expect(_treeitem.Collapsed).toBe(true);
    _teardown();
  });

  it("should not be collapsed if tree is expanded", () => {
    _setup(() => _givenState(false, []));
    expect(_treeitem.Collapsed).toBe(false);
    _teardown();
  });

  it("should not be collapsed if tree is collapsed but node is cached", () => {
    _setup(() => _givenState(true, [1]));
    expect(_treeitem.Collapsed).toBe(false);
    _teardown();
  });

  it("should be collapsed if tree is expanded but node is cached", () => {
    _setup(() => _givenState(false, [1]));
    expect(_treeitem.Collapsed).toBe(true);
    _teardown();
  });

  describe("ToggleNode", () => {

    it("should toggle collapsed", () => {
      _setup(() => {});
      expect(_treeitem.Collapsed).toBe(true);
      _whenToggleNode();
      expect(_treeitem.Collapsed).toBe(false);
      _whenToggleNode();
      expect(_treeitem.Collapsed).toBe(true);
      _teardown();
    });

    it("should cache state", () => {
      _setup(() => {});
      _whenToggleNode();
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _stateManager.CachedProperties.CachedNodes, [1]);
      _whenToggleNode();
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _stateManager.CachedProperties.CachedNodes, []);
      _teardown();
    });

  });

});