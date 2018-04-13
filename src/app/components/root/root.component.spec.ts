import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RootComponent } from "./root.component";
import { DemoComponent } from "../../../assets/demo/demo.component";
import { TreeviewComponent } from "../treeview/treeview.component";
import { TreeItemComponent } from "../treeitem/treeitem.component";
import { HttpModule } from "@angular/http";
import { CacheService } from "../../services/cache.service";
import { TreedataService } from "../../services/treedata.service";

describe("components/root", () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoComponent,
        TreeviewComponent,
        TreeItemComponent,
        RootComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        {provide: "$window", useValue: window},
        CacheService,
        TreedataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});