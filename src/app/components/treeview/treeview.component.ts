import { Component, Input } from "@angular/core";
import { ITreeview } from "../../models/treeview";

@Component({
  selector: "app-treeview",
  templateUrl: "./treeview.component.html",
  styleUrls: ["./treeview.component.css"]
})
export class TreeviewComponent {

  @Input("datasource") DataSourceUrl: string;
  @Input("treeid") ID: string;
  Data: ITreeview;

  constructor() { }

}