// import { Injectable} from '@angular/core';
// import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Observable';
// import { MyDataService } from '../../admin/services/my.data.service';
// @Injectable()
// export class TrackSearchService {
// 	constructor(private myDataService: MyDataService) {
//     }
// 	putOuts(body: any):any{
// 	   return this.myDataService.doGet('vehicle/api/data/rest/pass/downExcel',body);
// 	}
// 	getData(params: any):any{
// 	   return this.myDataService.doGet('api/analysis/track/agr/get',params); 
// 	}
//      //获取个区县单位
//      getCounty(xzqhVal: any):any{
//         return this.myDataService.doGet('vehicle/api/dic/rest/data/quxian?xzqh='+xzqhVal);  
//      }
//     //获取卡口信息
//     getKkList(xzqhVal):any{
//          return this.myDataService.doGet('vehicle/api/dic/rest/data/gate?xzqh='+xzqhVal);  
//     }
// }

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
