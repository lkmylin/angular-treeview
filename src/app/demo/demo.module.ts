import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CacheService } from "./services/cache.service";
import { TreedataService } from "./services/treedata.service";
import { HttpModule } from "@angular/http";
import { RootComponent } from "./components/root/root.component";
import { TreeviewModule } from "../treeview.module";

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TreeviewModule
  ],
  providers: [
    {provide: "$window", useValue: window},
    CacheService,
    TreedataService
  ],
  bootstrap: [RootComponent]
})
export class DemoModule { }