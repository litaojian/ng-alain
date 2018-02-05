import { Injectable } from '@angular/core';
// import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
// import { environment } from '../../environments/environment';
@Injectable()
export class CommonService {
	constructor(private http: HttpClient) {}
    getList(body:any):any{
	   return this.http
            .post('analysis/api/analysis/frequent/list',body);
	  
	}
    recentCar(body:any):any{
	   return this.http
            .post('analysis/api/analysis/late/track',body);	  
	}
	areaDel(body:any):any{
	   return this.http
            .post('analysis/api/analysis/regional/touch/detail',body);	  
	}
	areaByOneDel(body:any):any{
	   return this.http
            .post('analysis/api/analysis/track/detail',body);	  
	}
}
