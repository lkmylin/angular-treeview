import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ITreeItemPartial } from "../components/treeitem/treeitem";

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
