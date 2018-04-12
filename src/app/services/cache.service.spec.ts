import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {

  let _cacheService: CacheService = null;
  let _thenValue: any = null;

  let _setup: (cache: Object) => void = (cache: Object) => {
    TestBed.configureTestingModule({
      providers: [
        CacheService,
        {provide: "$window", useValue: new WindowMock(cache)}
      ]
    });
    _cacheService = TestBed.get(CacheService);
  };

  let _teardown: () => void = () => {
    _cacheService = null;
    _thenValue = null;
  };

  let _whenGetValue: (id: string, property: string, defaultValue: any) => void = (id: string, property: string, defaultValue: any) : void => {
    _thenValue = _cacheService.StateManager.GetValue(id, property, defaultValue);
  };

  let _whenSetValue: (id: string, property: string, value: any) => void = (id: string, property: string, value: any) : void => {
    _cacheService.StateManager.SetValue(id, property, value);
  };

  it('should be created', () => {
    _setup({});
    expect(_cacheService).toBeTruthy();
    _teardown();
  });

  describe("StateManager", () => {

    it("should get value from cache", () => {
      _setup({TreeviewCache: "{\"SomeID\":{\"SomeProperty\":\"Some Value\"}}"});
      _whenGetValue("SomeID", "SomeProperty", "");
      expect(_thenValue).toBe("Some Value");
      _teardown();
    });

    it("should return default value if requested property not in cache", () => {
      _setup({TreeviewCache: "{\"SomeID\":{\"SomeProperty\":\"Some Value\"}}"});
      _whenGetValue("SomeID", "SomePropertyNotInCache", "Default Value");
      expect(_thenValue).toBe("Default Value");
      _teardown();
    });

    it("should save value in cache", () => {
      _setup({});
      _whenSetValue("SomeID", "SomeProperty", "Some Value");
      expect(_cacheService.StateManager.CurrentState.SomeID.SomeProperty).toBe("Some Value");
      _teardown();
    });

  });

});

export class WindowMock {
  localStorage: any;
  constructor(cache: Object) {
    this.localStorage = cache;
  }
}