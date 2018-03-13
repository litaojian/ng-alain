
import { Injectable } from '@angular/core';
// import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
// import { environment } from '../../environments/environment';
@Injectable()
export class TrackSearchService {
	constructor(private http: HttpClient) {}
    getData(body:any):any{
	   return this.http
            .post('analysis/api/analysis/track/agr/get',body);
	  
	}
	newGetData(body:any):any{
	   return this.http
            .post('analysis/api/analysis/track/agr/get',body);
	  
	}
	newGetDetail(body:any,url:any):any{
	   return this.http
            .post(url,body);
	  
	}
	newGetDetailMore(body:any,url:any):any{
	   return this.http
            .post(url,body);
	  
	}
	getFirstList(body:any):any{
	   return this.http
            .post('analysis/api/analysis/first/appear/list',body);
	  
	}
	detailByOne(body:any):any{
	   return this.http
            .post('analysis/api/analysis/track/detail',body);	  
	}
    exports(body:any):any{
	   return this.http
            .post('analysis/api/analysis/track/export',body);	  
	}
	areaDel(body:any):any{
	   return this.http
            .post('analysis/api/analysis/regional/touch/detail',body);	  
	}
	areaByOneDel(body:any):any{
	   return this.http
            .post('analysis/api/analysis/track/detail',body);	  
	}
	getTabelHead(url:any):any{
	   return this.http
            .get(url);
	  
	}
}
