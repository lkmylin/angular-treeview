import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeviewComponent } from "./treeview.component";
import { TreeItemComponent } from "../treeitem/treeitem.component";
import { HttpModule } from "@angular/http";
import { Treeview, IStateManager } from "../../models/treeview";
import { TestData } from "../treeitem/treeitem.component.spec";
import { By } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { StateManagerMock } from "../../models/treeview.spec";

describe("components/treeview", () => {

  let _component: TreeviewComponent;
  let _fixture: ComponentFixture<TreeviewComponent>;
  let _stateManager: IStateManager = null;

  let _setupAsync: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [        
        TreeviewComponent,
        TreeItemComponent
      ]
    })
    .compileComponents();
  };

  let _setup: (additionalAction: () => void) => void = (additionalAction: () => void) => {
    _stateManager = new StateManagerMock();
    spyOn(_stateManager, "SetValue");
    additionalAction();
    _fixture = TestBed.createComponent(TreeviewComponent);
    _component = _fixture.componentInstance;
    _component.Data = new Treeview("someID", TestData, _stateManager);
    _fixture.detectChanges();
    spyOn(_component.Data, "ToggleAll").and.callThrough();
  };

  let _teardown: () => void = () => {
    _component = null
    _fixture = null;
    _stateManager = null;
  };

  let _givenState: (collapsed: boolean, cachedNodes: number[]) => void = (collapsed: boolean, cachedNodes: number[]) => {
    spyOn(_stateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        return property === _stateManager.CachedProperties.AllCollapsed ? collapsed : cachedNodes;
      });
  };

  let _whenToggleAllIconClick: () => void = () => {
    _fixture.debugElement.query(By.css(".treeview-collapse-all")).nativeElement.click();
    _fixture.detectChanges();
  };

  let _thenCollapsed: () => void = () => {
    expect(_fixture.debugElement.query(By.css(".treeview-collapse-all")).nativeElement.src.endsWith("plus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("app-treeitem"))[0].queryAll(By.css("img"))[0].nativeElement.src.endsWith("plus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("app-treeitem"))[0].queryAll(By.css("img"))[1].nativeElement.src.endsWith("folder.gif")).toBe(true);
  };

  let _thenExpanded: () => void = () => {
    expect(_fixture.debugElement.query(By.css(".treeview-collapse-all")).nativeElement.src.endsWith("minus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("app-treeitem"))[0].queryAll(By.css("img"))[0].nativeElement.src.endsWith("minus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("app-treeitem"))[0].queryAll(By.css("img"))[1].nativeElement.src.endsWith("open.gif")).toBe(true);
  };

  it("should create", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(_component).toBeTruthy();
    _teardown();
  });

  it("should build tree", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(_fixture.debugElement.queryAll(By.css("app-treeitem")).length).toBe(11);
    _teardown();
  });

  it("should be collapsed by defalt", async () => {
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

  describe("expand/collapse icon click event", () => {

    it("should invoke ToggleAll", async () => {
      await _setupAsync();
      _setup(() => {});
      _whenToggleAllIconClick();
      expect(_component.Data.ToggleAll).toHaveBeenCalled();
      _teardown();
    });

    it("should expand/collapse tree", async () => {
      await _setupAsync();
      _setup(() => {});
      _whenToggleAllIconClick();
      _thenExpanded();
      _whenToggleAllIconClick();
      _thenCollapsed();
      _teardown();
    });

  });

});