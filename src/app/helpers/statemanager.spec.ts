import { TestBed } from "@angular/core/testing";
import { IStateManager, StateManager } from "../helpers/statemanager";

describe("helpers/statemanager", () => {

  let _window: WindowMock = null;
  let _stateManager: IStateManager = null;
  let _thenValue: any = null;

  let _setup: (cache: any) => void = (cache: any) : void => {
    TestBed.configureTestingModule({
      providers: [
        {provide: "$window", useValue: new WindowMock(cache)}
      ]
    });
    _window = TestBed.get("$window");
    _stateManager = new StateManager(<Window>_window);
  };

  let _teardown: () => void = () : void => {
    _window = null;
    _stateManager = null;
    _thenValue = null;
  };

  let _whenGetValue: (id: string, property: string, defaultValue: any) => void = (id: string, property: string, defaultValue: any) : void => {
    _thenValue = _stateManager.GetValue(id, property, defaultValue);
  };

  let _whenSetValue: (id: string, property: string, value: any) => void = (id: string, property: string, value: any) : void => {
    _stateManager.SetValue(id, property, value);
  };

  it("should be instantiated", () => {
    _setup({});
    expect(_stateManager).toBeTruthy();
    _teardown();
  });

  it("should pull cached data from localStorage", () => {
    _setup({TreeviewCache: "{\"SomeID\":{\"SomeProperty\":\"SomeValue\"}}"});
    expect(_stateManager.CurrentState.SomeID.SomeProperty).toBe("SomeValue");
    _teardown();
  });

  describe("GetValue", () => {

    it("should return default value if requested value not cached", () => {
      _setup({});
      _whenGetValue("SomeID", "SomeProperty", "SomeDefaultValue");
      expect(_thenValue).toBe("SomeDefaultValue");
      _teardown();
    });

    it("should return cached value", () => {
      _setup({TreeviewCache: "{\"SomeID\":{\"SomeProperty\":\"SomeValue\"}}"});
      _whenGetValue("SomeID", "SomeProperty", "");
      expect(_thenValue).toBe("SomeValue");
      _teardown();
    });

  });

  describe("SetValue", () => {

    it("should cache value in localStorage", () => {
      _setup({});
      _whenSetValue("SomeID", "SomeProperty", "SomeValue");
      expect(_stateManager.CurrentState).toEqual({SomeID: {SomeProperty: "SomeValue"}});
      expect(_window.localStorage).toEqual({TreeviewCache: "{\"SomeID\":{\"SomeProperty\":\"SomeValue\"}}"});
      _teardown();
    });

  });

});

class WindowMock {
  localStorage: any;
  constructor (cache: any) {
    this.localStorage = cache;
  }
}