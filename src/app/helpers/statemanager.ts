import { Inject, Injectable } from "@angular/core";

export interface IStateManager {
  GlobalScope: Window;
  CurrentState: any;
  GetValue(controlID: string, property: string, defaultValue: any): any;
  SetValue(controlID: string, property: string, value: any): void;
}

@Injectable()
export class StateManager implements IStateManager {
  GlobalScope: Window;
  CurrentState: any;
  GetValue(controlID: string, property: string, defaultValue: any): any {
    if (!this.CurrentState[controlID]) this.CurrentState[controlID] = {};
    return typeof this.CurrentState[controlID][property] === "undefined" ? defaultValue : this.CurrentState[controlID][property];
  };
  SetValue(controlID: string, property: string, value: any): void {
    if (!this.CurrentState[controlID]) this.CurrentState[controlID] = {};
    this.CurrentState[controlID][property] = value;
    if (this.GlobalScope.localStorage) this.GlobalScope.localStorage.TreeviewCache = JSON.stringify(this.CurrentState);
  };
  constructor(@Inject("window") globalScope: any) {
    this.GlobalScope = globalScope;
    this.CurrentState = globalScope.localStorage && globalScope.localStorage.TreeviewCache ? JSON.parse(globalScope.localStorage.TreeviewCache) : {};
  }
}