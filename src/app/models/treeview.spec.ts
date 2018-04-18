import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeviewComponent } from "../components/treeview/treeview.component";
import { TreeItemComponent } from "../components/treeitem/treeitem.component";
import { Treeview, ITreeview, IStateManager, ICachedProperties } from "./treeview";
import { TestData } from "../components/treeitem/treeitem.component.spec";

describe("models/treeview", () => {

  let _stateManager: IStateManager = null;
  let _treeview: ITreeview = null;
  let _thenResult: any = null;

  let _setup: (additionalAction: () => void) => void = (additionalAction: () => void) => {
    _stateManager = new StateManagerMock();
    spyOn(_stateManager, "SetValue");
    additionalAction();
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
        return property === _stateManager.CachedProperties.AllCollapsed ? collapsed : expandedNodes;
      });
  };

  let _whenToggleAll: () => void = () => {
    _treeview.ToggleAll();
  };

  let _whenIsNodeCollapsed: (treeKey: number) => void = (treeKey: number) => {
    _thenResult = _treeview.IsNodeCollapsed(treeKey);
  };

  it("should be instantiated", () => {
    _setup(() => {});
    expect(_treeview).toBeTruthy();
    _teardown();
  });

  it("should build tree", () => {
    _setup(() => {});
    expect(_treeview.TreeItems.length).toBe(4);
    expect(_treeview.TreeItems[0].Children.length).toBe(2);
    _teardown();
  });

  it("should be collapsed by default", () => {
    _setup(() => {});
    expect(_treeview.Collapsed).toBe(true);
    _teardown();
  });

  it("should not be collapsed if tree is expanded", () => {
    _setup(() => _givenState(false, []));
    expect(_treeview.Collapsed).toBe(false);
    _teardown();
  });

  describe("ToggleAll", () => {

    it("should expand/collapse tree", () => {
      _setup(() => {});
      _whenToggleAll();
      expect(_treeview.Collapsed).toBe(false);
      _whenToggleAll();
      expect(_treeview.Collapsed).toBe(true);
      _teardown();
    });

    it("should save state in cache", () => {
      _setup(() => {});
      _whenToggleAll();
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _stateManager.CachedProperties.AllCollapsed, false);
      expect(_stateManager.SetValue).toHaveBeenCalledWith(_treeview.ID, _stateManager.CachedProperties.CachedNodes, []);
      _teardown();
    });

  });

  describe("IsNodeCollapsed", () => {

    it("should get expanded nodes from cache", () => {
      _setup(() => _givenState(true, [1]));
      _whenIsNodeCollapsed(1);
      expect(_stateManager.GetValue).toHaveBeenCalledWith(_treeview.ID, _stateManager.CachedProperties.CachedNodes, []);
      _teardown()
    });

    it("should return true by default", () => {
      _setup(() => {});
      _whenIsNodeCollapsed(1);
      expect(_thenResult).toBe(true);
      _teardown()
    });

    it("should return false if node is expanded", () => {
      _setup(() => _givenState(true, [1]));
      _whenIsNodeCollapsed(1);
      expect(_thenResult).toBe(false);
      _teardown()
    });

    it("should return false if tree is expanded", () => {
      _setup(() => _givenState(false, []));
      _whenIsNodeCollapsed(1);
      expect(_thenResult).toBe(false);
      _teardown()
    });

  });

});

export class StateManagerMock implements IStateManager {
  GlobalScope: Window;
  CachedProperties: ICachedProperties = {
    AllCollapsed: "AllCollapsed",
    CachedNodes: "CachedNodes"
  };
  CurrentState: any;
  GetValue(controlID: string, property: string, defaultValue: any) : any {
    return property === this.CachedProperties.AllCollapsed ? true : [];
  };
  SetValue(controlID: string, property: string, value: any) : void {};
}