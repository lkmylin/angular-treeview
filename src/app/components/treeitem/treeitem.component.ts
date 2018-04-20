import { Component, OnInit, Input } from "@angular/core";
import { ITreeItem } from "../../models/treeitem";

@Component({
  selector: "lkm-treeitem",
  templateUrl: "./treeitem.component.html",
  styleUrls: ["./treeitem.component.css"]
})
export class TreeItemComponent implements OnInit {

  @Input() Item: ITreeItem;

  constructor() { }

  ngOnInit() { }

}