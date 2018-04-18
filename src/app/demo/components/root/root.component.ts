import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { Treeview, TreeviewComponent } from "../../../../../angular-treeview";
import { CacheService } from "../../services/cache.service";
import { TreedataService } from "../../services/treedata.service";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements AfterViewInit {

  @ViewChild("tree1") private _tree1: TreeviewComponent;
  @ViewChild("tree2") private _tree2: TreeviewComponent;

  constructor(private _treeDataService: TreedataService, private _cacheService: CacheService) { }

  ngAfterViewInit() {
    const context = this;
    context._treeDataService.Get(context._tree1.DataSourceUrl)
      .subscribe(data => context._tree1.Data = new Treeview(context._tree1.ID, data, this._cacheService.StateManager));
    context._treeDataService.Get(context._tree2.DataSourceUrl)
      .subscribe(data => context._tree2.Data = new Treeview(context._tree2.ID, data, this._cacheService.StateManager));
  }

}