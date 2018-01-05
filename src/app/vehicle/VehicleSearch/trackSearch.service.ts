import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
// import { environment } from '../../environments/environment';
@Injectable()
export class TrackSearchService {
	constructor(private http: HttpClient) {}

	getTrackSearch(params: any):any{
	   return this.http
            .get('remote/api/rest/passrec', {params});
	  
	}
	getTrackSearchByOne(params: any):any{
	   return this.http
            .get('remote/api/rest/passrec', {params});
	}
     //获取个区县单位
     getCounty(xzqh):any{
        return this.http.get("remote/api/rest/qxList?dmz="+xzqh);
     }
    //获取卡口信息
    getKkList(xzqh):any{
        return this.http.get("remote/api/rest/kkList?xzqh="+xzqh);
    }
}
