import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TreeItemComponent } from "./components/treeitem/treeitem.component";
import { TreeviewComponent } from "./components/treeview/treeview.component";
import { CacheService } from "./services/cache.service";
import { TreedataService } from "./services/treedata.service";
import { HttpModule } from "@angular/http";
import { RootComponent } from "./components/root/root.component";
import { DemoComponent } from "../assets/demo/demo.component";

@NgModule({
  declarations: [
    TreeItemComponent,
    TreeviewComponent,
    RootComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    {provide: "$window", useValue: window},
    CacheService,
    TreedataService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }