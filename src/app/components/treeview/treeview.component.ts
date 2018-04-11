import { Component, OnInit, Inject, Input } from '@angular/core';
import { CacheService } from '../../services/cache.service';
import {TreedataService} from "../../services/treedata.service";
import { ITreeview, Treeview } from './treeview';
import { ITreeItemPartial } from "../treeitem/treeitem";

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {

  @Input("datasource") _url: string;
  @Input("treeid") _id: string;
  Data: ITreeview;

  constructor(private _cacheService: CacheService, private _treeDataService: TreedataService) { }

  ngOnInit() {
    const context = this;
    context._treeDataService.Get(context._url).subscribe((data: ITreeItemPartial[]) => {
      context.Data = new Treeview(context._id + "_treeviewcomponent", data, context._cacheService.StateManager);
    });
  }

}