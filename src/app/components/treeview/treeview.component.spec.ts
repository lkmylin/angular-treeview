import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeviewComponent } from './treeview.component';
import { TreeItemComponent } from '../treeitem/treeitem.component';
import { CacheService } from '../../services/cache.service';
import { HttpModule } from '@angular/http';
import { TreedataService } from '../../services/treedata.service';

describe('TreeviewComponent', () => {
  let component: TreeviewComponent;
  let fixture: ComponentFixture<TreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [        
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
    fixture = TestBed.createComponent(TreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});