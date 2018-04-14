import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeviewComponent } from "./treeview.component";
import { TreeItemComponent } from "../treeitem/treeitem.component";
import { CacheService } from "../../services/cache.service";
import { HttpModule } from "@angular/http";
import { TreedataService } from "../../services/treedata.service";
import { WindowMock } from "../../services/cache.service.spec";
import { Treeview } from "../../models/treeview";
import { TestData } from "../treeitem/treeitem.component.spec";
import { By } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

describe("components/treeview", () => {

  let _component: TreeviewComponent;
  let _fixture: ComponentFixture<TreeviewComponent>;
  let _cacheService: CacheService = null;
  let _dataService: TreedataService = null;

  let _setupAsync: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [        
        TreeviewComponent,
        TreeItemComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        {provide: "$window", useValue: new WindowMock({})},
        CacheService,
        TreedataService
      ]
    })
    .compileComponents();
  };

  let _setup: (additionalAction: () => void) => void = (additionalAction: () => void) => {
    _cacheService = TestBed.get(CacheService);
    _dataService = TestBed.get(TreedataService);
    spyOn(_cacheService.StateManager, "SetValue");
    spyOn(_dataService, "Get").and.callFake((url: string) => Observable.of(TestData));
    additionalAction();
    _fixture = TestBed.createComponent(TreeviewComponent);
    _component = _fixture.componentInstance;
    _component._id = "someID";    
    _fixture.detectChanges();
    spyOn(_component.Data, "ToggleAll").and.callThrough();
  };

  let _teardown: () => void = () => {
    _component = null
    _fixture = null;
    _cacheService = null;
    _dataService = null;
  };

  let _givenState: (collapsed: boolean, cachedNodes: number[]) => void = (collapsed: boolean, cachedNodes: number[]) => {
    spyOn(_cacheService.StateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        return property === "AllCollapsed" ? collapsed : cachedNodes;
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