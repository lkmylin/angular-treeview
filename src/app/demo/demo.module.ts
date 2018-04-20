import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { StateManagerModule, StateManager } from "@lkmylin/angular-statemanager";
import { TreeviewModule } from "@lkmylin/angular-treeview";
import { RootComponent } from "./components/root/root.component";

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StateManagerModule,
    TreeviewModule    
  ],
  providers: [
    {provide: "window", useValue: window},
    StateManager
  ],
  bootstrap: [RootComponent]
})
export class DemoModule { }