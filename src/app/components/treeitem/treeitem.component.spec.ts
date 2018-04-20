import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeItemComponent } from "./treeitem.component";
import { TreeItem, ITreeItemPartial } from "../../models/treeitem";
import { Treeview, ITreeview, } from "../../models/treeview";
import { By } from "@angular/platform-browser";
import { StateManagerMock } from "../../models/treeview.spec";
import { IStateManager } from "@lkmylin/angular-statemanager";

describe("components/treeitem", () => {

  let _component: TreeItemComponent;
  let _fixture: ComponentFixture<TreeItemComponent>;
  let _treeview: ITreeview;
  let _stateManager: IStateManager;

  let _createComponent: () => void = () : void => {
    _fixture = TestBed.createComponent(TreeItemComponent);
    _component = _fixture.componentInstance;    
    _treeview = new Treeview("someID", TestData, _stateManager);
    _component.Item = _treeview.TreeItems[0];
    spyOn(_component.Item, "ToggleNode").and.callThrough();
    _fixture.detectChanges();
  };

  let _setup: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [ TreeItemComponent ]
    }).compileComponents();
    _stateManager = new StateManagerMock();
    spyOn(_stateManager, "SetValue");
    _createComponent();
  };

  let _teardown: () => void = () => {
    _component = null;
    _fixture = null;
    _stateManager = null;
    _treeview = null;
  };

  let _givenState: (collapsed: boolean, cachedNodes: number[]) => void = (collapsed: boolean, cachedNodes: number[]) => {
    spyOn(_stateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        return property === _treeview.CacheProperties.AllCollapsed ? collapsed : cachedNodes;
      });
    _createComponent();
  };

  let _whenClickPlusIcon: () => void = () => {
    _fixture.debugElement.queryAll(By.css("img"))[0].nativeElement.click();
    _fixture.detectChanges();
  };

  let _whenClickFolderIcon: () => void = () => {
    _fixture.debugElement.queryAll(By.css("img"))[1].nativeElement.click();
    _fixture.detectChanges();    
  };

  let _thenCollapsed: (all: boolean) => void = (all: boolean) => {
    expect(_fixture.debugElement.queryAll(By.css("img"))[0].nativeElement.src.endsWith("plus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("img"))[1].nativeElement.src.endsWith("folder.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("[hidden]")).length).toBe(all ? 2 : 1)
  };

  let _thenExpanded: (all: boolean) => void = (all : boolean) => {
    expect(_fixture.debugElement.queryAll(By.css("img"))[0].nativeElement.src.endsWith("minus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("img"))[1].nativeElement.src.endsWith("open.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("[hidden]")).length).toBe(all ? 0 : 1);
  };

  beforeEach(_setup);
  afterEach(_teardown);

  it("should create", () => {
    expect(_component).toBeTruthy();
  });

  it("should have title", () => {
    expect(_fixture.debugElement.query(By.css(".treeview-treeitem-title")).nativeElement.textContent).toBe("TreeItem1");
  });

  it("should have descendants", () => {
    expect(_fixture.debugElement.queryAll(By.css("lkm-treeitem")).length).toBe(3);
  });

  it("should be collapsed by default", () => {
    _thenCollapsed(true);
  });

  it("should not be collapsed if tree is expanded", () => {
    _givenState(false, [])
    _thenExpanded(true);
  });

  it("should not be collapsed if tree is collapsed but node is cached", () => {
    _givenState(true, [1])
    _thenExpanded(false);
  });

  it("should be collapsed if tree is expanded but node is cached", () => {
    _givenState(false, [1])
    _thenCollapsed(false);
  });

  describe("plus-icon click event", () => {

    it("should invoke ToggleNode", () => {
      _whenClickPlusIcon();
      expect(_component.Item.ToggleNode).toHaveBeenCalled();
    });

    it("should toggle node", () => {
      _thenCollapsed(true);
      _whenClickPlusIcon();
      _thenExpanded(false);
      _whenClickPlusIcon();
      _thenCollapsed(true);
    });

  });

  describe("folder-icon click event", () => {

    it("should invoke ToggleNode", () => {
      _whenClickPlusIcon();
      expect(_component.Item.ToggleNode).toHaveBeenCalled();
    });

    it("should toggle node", () => {
      _thenCollapsed(true);
      _whenClickFolderIcon();
      _thenExpanded(false);
      _whenClickFolderIcon();
      _thenCollapsed(true);
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