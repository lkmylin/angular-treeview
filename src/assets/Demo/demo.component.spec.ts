import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponent } from './demo.component';
import { HttpModule } from '@angular/http';
import { CacheService } from '../../app/services/cache.service';
import { TreedataService } from '../../app/services/treedata.service';
import { TreeviewComponent } from '../../app/components/treeview/treeview.component';
import { TreeItemComponent } from '../../app/components/treeitem/treeitem.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoComponent,
        TreeviewComponent,
        TreeItemComponent
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
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});