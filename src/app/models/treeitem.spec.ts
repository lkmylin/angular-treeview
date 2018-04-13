import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeviewComponent } from "../components/treeview/treeview.component";
import { TreeItemComponent } from "../components/treeitem/treeitem.component";
import { CacheService } from "../services/cache.service";
import { WindowMock } from "../services/cache.service.spec";
import { Treeview, ITreeview } from "./treeview";
import { TestData } from "../components/treeitem/treeitem.component.spec";
import { ITreeItem } from "./treeitem";

describe("models/treeitem", () => {

  let _cacheService: CacheService = null;
  let _treeview: ITreeview = null;
  let _treeitem: ITreeItem = null;

  let _setup: (additionalAction: () => void) => void = (additionalAction: () => void) => {
    TestBed.configureTestingModule({
      providers: [
        {provide: "$window", useValue: new WindowMock({})},
        CacheService
      ]
    });
    _cacheService = TestBed.get(CacheService);
    spyOn(_cacheService.StateManager, "SetValue");
    additionalAction();
    _treeview = new Treeview("someID", TestData, _cacheService.StateManager);
    _treeitem = _treeview.TreeItems[0];
  };

  let _teardown: () => void = () => {
    _cacheService = null;
    _treeview = null;
    _treeitem = null;
  };

  let _givenState: (collapsed: boolean, expandedNodes: number[]) => void = (collapsed: boolean, expandedNodes: number[]) => {
    spyOn(_cacheService.StateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        return property === "AllCollapsed" ? collapsed : expandedNodes;
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

  it("should not be collapsed if node is expanded in cache", () => {
    _setup(() => _givenState(true, [1]));
    expect(_treeitem.Collapsed).toBe(false);
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
      expect(_cacheService.StateManager.SetValue).toHaveBeenCalledWith("someID", "ExpandedNodes", [1]);
      _whenToggleNode();
      expect(_cacheService.StateManager.SetValue).toHaveBeenCalledWith("someID", "ExpandedNodes", []);
      _teardown();
    });

  });

});