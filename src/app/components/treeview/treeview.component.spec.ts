import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TreeviewComponent } from "./treeview.component";
import { TreeItemComponent } from "../treeitem/treeitem.component";
import { Http, HttpModule } from "@angular/http";
import { Treeview } from "../../models/treeview";
import { TestData } from "../treeitem/treeitem.component.spec";
import { By } from "@angular/platform-browser";
import { StateManagerMock } from "../../models/treeview.spec";
import { IStateManager, StateManager } from "@lkmylin/angular-statemanager";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

describe("components/treeview", () => {

  let _component: TreeviewComponent;
  let _fixture: ComponentFixture<TreeviewComponent>;
  let _stateManager: IStateManager = null;
  let _treeview: Treeview = null;

  let _createComponent: () => void = () : void => {
    _fixture = TestBed.createComponent(TreeviewComponent);
    _component = _fixture.componentInstance;    
    _fixture.detectChanges();
    spyOn(_component.Data, "ToggleAll").and.callThrough();
  };

  let _setup: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [        
        TreeviewComponent,
        TreeItemComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        {provide: StateManager, useValue: new StateManagerMock()}
      ]
    }).compileComponents();
    _stateManager = TestBed.get(StateManager);
    spyOn(_stateManager, "SetValue");
    const response = new Response();
    spyOn(response, "json").and.returnValue(TestData);
    const http: Http = TestBed.get(Http);
    spyOn(http, "get").and.callFake(() => Observable.of(response));
    _treeview = new Treeview("someID", TestData, _stateManager);
    _createComponent();
  };

  let _teardown: () => void = () => {
    _component = null
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

  let _whenToggleAllIconClick: () => void = () => {
    _fixture.debugElement.query(By.css(".treeview-collapse-all")).nativeElement.click();
    _fixture.detectChanges();
  };

  let _thenCollapsed: () => void = () => {
    expect(_fixture.debugElement.query(By.css(".treeview-collapse-all")).nativeElement.src.endsWith("plus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("lkm-treeitem"))[0].queryAll(By.css("img"))[0].nativeElement.src.endsWith("plus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("lkm-treeitem"))[0].queryAll(By.css("img"))[1].nativeElement.src.endsWith("folder.gif")).toBe(true);
  };

  let _thenExpanded: () => void = () => {
    expect(_fixture.debugElement.query(By.css(".treeview-collapse-all")).nativeElement.src.endsWith("minus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("lkm-treeitem"))[0].queryAll(By.css("img"))[0].nativeElement.src.endsWith("minus.gif")).toBe(true);
    expect(_fixture.debugElement.queryAll(By.css("lkm-treeitem"))[0].queryAll(By.css("img"))[1].nativeElement.src.endsWith("open.gif")).toBe(true);
  };

  beforeEach(_setup);

  afterEach(_teardown);

  it("should create", () => {    
    expect(_component).toBeTruthy();
  });

  it("should build tree", () => {
    expect(_fixture.debugElement.queryAll(By.css("lkm-treeitem")).length).toBe(11);
  });

  it("should be collapsed by defalt", () => {
    _thenCollapsed();
  });

  it("should not be collapsed if tree is expanded", () => {
    _givenState(false, []);
    _thenExpanded();
  });

  describe("expand/collapse icon click event", () => {

    it("should invoke ToggleAll", () => {
      _whenToggleAllIconClick();
      expect(_component.Data.ToggleAll).toHaveBeenCalled();
    });

    it("should expand/collapse tree", () => {
      _whenToggleAllIconClick();
      _thenExpanded();
      _whenToggleAllIconClick();
      _thenCollapsed();
    });

  });

});