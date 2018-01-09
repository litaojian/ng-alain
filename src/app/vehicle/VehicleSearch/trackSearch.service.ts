import { Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { MyDataService } from '../../admin/services/my.data.service';
@Injectable()
export class TrackSearchService {
	constructor(private myDataService: MyDataService) {
    }
	putOuts(body: any):any{
	   return this.myDataService.doGet('vehicle/api/data/rest/pass/downExcel',body);
	}
	getData(params: any):any{
	   return this.myDataService.doGet('vehicle/api/data/rest/pass/getdata',params); 
	}
     //获取个区县单位
     getCounty(xzqhVal: any):any{
        return this.myDataService.doGet('vehicle/api/dic/rest/data/quxian?xzqh='+xzqhVal);  
     }
    //获取卡口信息
    getKkList(xzqhVal):any{
         return this.myDataService.doGet('vehicle/api/dic/rest/data/gate?xzqh='+xzqhVal);  
    }
}
