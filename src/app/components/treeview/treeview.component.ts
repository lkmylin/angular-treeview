import { Component, Input, OnInit } from "@angular/core";
import { ITreeview, Treeview } from "../../models/treeview";
import { Http, Response } from "@angular/http";
import { StateManager } from "../../helpers/statemanager";
import { ITreeItemPartial } from "../../models/treeitem";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Component({
  selector: "app-treeview",
  templateUrl: "./treeview.component.html",
  styleUrls: ["./treeview.component.css"]
})
export class TreeviewComponent implements OnInit {

  @Input("datasource") private _dataSourceUrl: string;
  @Input("treeid") ID: string;
  Data: ITreeview;

  constructor(private _http: Http, private _stateManager: StateManager) { }

  ngOnInit() {
    const context = this;
    context._http.get(context._dataSourceUrl).map<Response, ITreeItemPartial[]>(response => response.json())
      .catch<ITreeItemPartial[], ITreeItemPartial[]>(error => {
        console.log(error);
        return null;
      }).subscribe(data => {
        context.Data = new Treeview(context.ID, data, context._stateManager);
      });
  }

}