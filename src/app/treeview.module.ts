import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreeviewComponent } from "./components/treeview/treeview.component";
import { TreeItemComponent } from "./components/treeitem/treeitem.component";
import { Treeview } from "./models/treeview";
import { TreeItem } from "./models/treeitem";
export { Treeview, TreeviewCacheProperties } from "./models/treeview";
export { TreeItem } from "./models/treeitem";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TreeItemComponent,
    TreeviewComponent
  ],
  exports: [
    TreeItemComponent,
    TreeviewComponent
  ]
})
export class TreeviewModule { }