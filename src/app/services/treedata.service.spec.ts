import { TestBed, inject } from "@angular/core/testing";
import { TreedataService } from "./treedata.service";
import { HttpModule, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

describe("services/treedata", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TreedataService
      ],
      imports: [
        HttpModule
      ]
    });
    let http: Http = TestBed.get(Http);
    let response : Response = new Response();
    let result: Observable<Response> = Observable.of(response);
    spyOn(response, "json").and.returnValue([{TreeKey: 1, ParentKey: 0, Title: "Some Tree Item"}]);
    spyOn(http, "get").and.callFake((url: string) => result);
  });

  it("should be created", inject([TreedataService], (service: TreedataService) => {    
    expect(service).toBeTruthy();
  }));

  describe("Get", () => {

    it("should return tree data", inject([TreedataService], (service: TreedataService) => {    
      service.Get("some_url").subscribe(data => expect(data).toEqual([{TreeKey: 1, ParentKey: 0, Title: "Some Tree Item"}]));
    }));

  });
  
});