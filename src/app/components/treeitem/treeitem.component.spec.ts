import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeItemComponent } from "./treeitem.component";
import { TreeItem, ITreeItemPartial } from "../../models/treeitem";
import { Treeview, ITreeview } from "../../models/treeview";
import { WindowMock } from "../../services/cache.service.spec";
import { CacheService } from "../../services/cache.service";
import { By } from "@angular/platform-browser";

describe("components/treeitem", () => {

  let _component: TreeItemComponent;
  let _fixture: ComponentFixture<TreeItemComponent>;
  let _treeview: ITreeview;
  let _cacheService: CacheService;

  let _setupAsync: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [ TreeItemComponent ],
      providers: [
        {provide: "$window", useValue: new WindowMock({})},
        CacheService
      ]
    })
    .compileComponents();
  };

  let _setup: (additionalAction: () => void) => void = (additionalAction: () => void) => {
    _cacheService = TestBed.get(CacheService);
    spyOn(_cacheService.StateManager, "SetValue");
    additionalAction();
    _fixture = TestBed.createComponent(TreeItemComponent);
    _component = _fixture.componentInstance;    
    _treeview = new Treeview("someID", TestData, _cacheService.StateManager);
    _component.Item = _treeview.TreeItems[0];
    _fixture.detectChanges();
  };

  let _teardown: () => void = () => {
    _component = null;
    _fixture = null;
    _cacheService = null;
    _treeview = null;
  };

  let _givenState: (collapsed: boolean, expandedNodes: number[]) => void = (collapsed: boolean, expandedNodes: number[]) => {
    spyOn(_cacheService.StateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        return property === "AllCollapsed" ? collapsed : expandedNodes;
      });
  };

  let _whenToggleNode: () => void = () => {
    _component.Item.ToggleNode();
    _fixture.detectChanges();
  };

  let _thenCollapsed: () => void = () => {
    expect(_fixture.debugElement.queryAll(By.css("img"))[0].nativeElement.src.endsWith("plus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("img"))[1].nativeElement.src.endsWith("folder.gif")).toBe(true);
  };

  let _thenExpanded: () => void = () => {
    expect(_fixture.debugElement.queryAll(By.css("img"))[0].nativeElement.src.endsWith("minus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("img"))[1].nativeElement.src.endsWith("open.gif")).toBe(true);
  };

  it("should create", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(_component).toBeTruthy();
    _teardown();
  });

  it("should have title", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(_fixture.debugElement.query(By.css(".treeview-treeitem-title")).nativeElement.textContent).toBe("TreeItem1");
    _teardown();
  });

  it("should have children", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(_fixture.debugElement.queryAll(By.css("app-treeitem")).length).toBe(3);
    _teardown();
  });

  it("should be collapsed by default", async () => {
    await _setupAsync();
    _setup(() => {});
    _thenCollapsed();
    _teardown();
  });

  it("should not be collapsed if tree is expanded", async () => {
    await _setupAsync();
    _setup(() => _givenState(false, []));
    _thenExpanded();
    _teardown();
  });

  it("should not be collapsed if node is expanded in cache", async () => {
    await _setupAsync();
    _setup(() => _givenState(true, [1]));
    _thenExpanded();
    _teardown();
  });

  describe("ToggleNode", () => {

    it("should toggle collapsed", async () => {
      await _setupAsync();
      _setup(() => {});
      _thenCollapsed();
      _whenToggleNode();
      _thenExpanded();
      _whenToggleNode();
      _thenCollapsed();
      _teardown();
    });

  });

});

export const TestData: Array<ITreeItemPartial> = [
  {
    TreeKey: 1,
    ParentKey: 0,
    Title: "TreeItem1"
  },
  {
    TreeKey: 2,
    ParentKey: 0,
    Title: "TreeItem2"
  },
  {
    TreeKey: 3,
    ParentKey: 0,
    Title: "TreeItem3"
  },
  {
    TreeKey: 4,
    ParentKey: 0,
    Title: "TreeItem4"
  },
  {
    TreeKey: 5,
    ParentKey: 1,
    Title: "TreeItem5"
  },
  {
    TreeKey: 6,
    ParentKey: 1,
    Title: "TreeItem6"
  },
  {
    TreeKey: 7,
    ParentKey: 5,
    Title: "TreeItem7"
  },
  {
    TreeKey: 8,
    ParentKey: 3,
    Title: "TreeItem8"
  },
  {
    TreeKey: 9,
    ParentKey: 3,
    Title: "TreeItem9"
  },
  {
    TreeKey: 10,
    ParentKey: 4,
    Title: "TreeItem10"
  },
  {
    TreeKey: 11,
    ParentKey: 10,
    Title: "TreeItem11"
  }
];