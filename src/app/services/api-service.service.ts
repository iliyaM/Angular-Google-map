import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiServiceService {

  constructor(private http:Http) { }

  getBranches() :Observable<Response> {
    return this.http.get('assets/api/branches.json').map(res => res.json());
  }
}
