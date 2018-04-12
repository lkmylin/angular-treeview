import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeItemComponent } from './treeitem.component';
import { TreeItem, ITreeItemPartial } from './treeitem';
import { Treeview, ITreeview } from '../treeview/treeview';
import { WindowMock } from '../../services/cache.service.spec';
import { CacheService } from '../../services/cache.service';
import { By } from '@angular/platform-browser';

describe('TreeitemComponent', () => {

  let component: TreeItemComponent;
  let fixture: ComponentFixture<TreeItemComponent>;
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
    additionalAction();
    fixture = TestBed.createComponent(TreeItemComponent);
    component = fixture.componentInstance;
    _cacheService = TestBed.get(CacheService);
    _treeview = new Treeview("someID", TestData, _cacheService.StateManager);
    component.Item = _treeview.TreeItems[0];
    fixture.detectChanges();
  };

  let _teardown: () => void = () => {
    _cacheService = null;
    _treeview = null;
  };

  let _givenState: (collapsed: boolean, expandedNodes: number[]) => void = (collapsed: boolean, expandedNodes: number[]) => {
    spyOn(_cacheService.StateManager, "GetValue")
      .and.callFake((id: string, property: string, defaultValue: any) => {
        console.log(property);
        return property === "AllCollapsed" ? collapsed : expandedNodes;
      });
  };

  it('should create', async () => {
    await _setupAsync();
    _setup(() => {});
    expect(component).toBeTruthy();
    _teardown();
  });

  it("should have title", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(fixture.debugElement.query(By.css(".treeview-treeitem-title")).nativeElement.textContent).toBe("TreeItem1");
    _teardown();
  });

  it("should have children", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(component.Item.HasChildren).toBe(true);
    expect(component.Item.Children.length).toBe(2);
    _teardown();
  });

  it("should be collapsed by default", async () => {
    await _setupAsync();
    _setup(() => {});
    expect(component.Item.Collapsed).toBe(true);
    _teardown();
  });

  it("should not be collapsed if tree is expanded", async () => {
    await _setupAsync();
    _setup(() => _givenState(false, []));
    expect(component.Item.Collapsed).toBe(false);
    _teardown();
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