import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RootComponent } from "./components/root/root.component";
import { TreeviewModule, StateManager } from "@lkmylin/angular-treeview";

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
    {provide: "window", useValue: window},
    StateManager
  ],
  bootstrap: [RootComponent]
})
export class DemoModule { }