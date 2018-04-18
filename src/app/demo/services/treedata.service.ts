import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ITreeItemPartial } from "../../../../angular-treeview";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class TreedataService {

  Get(url: string): Observable<ITreeItemPartial[]> {
    return this.http.get(url)
      .map((response: any) => response.json())
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  };

  constructor(private http: Http) { }

}