import { Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { MyDataService } from '../../admin/services/my.data.service';
@Injectable()
export class TrackSearchService {
	constructor(private MyDataService: MyDataService) {
    }
	getTrackSearch(body: any):any{
	  
	}
	// getTrackSearchByOne(gcxh: any,sj:any):any{
	//    return this.MyDataService.doGet('vehicle/api/data/pass/passinfo?gcxh='+gcxh+'&sj=201709');
	// }
     //获取个区县单位
     getCounty(xzqhVal: any):any{
        return this.MyDataService.doGet('vehicle/api/dic/rest/data/quxian?xzqh='+xzqhVal);  
     }
    //获取卡口信息
    getKkList(xzqhVal):any{
         return this.MyDataService.doGet('vehicle/api/dic/rest/data/gate?xzqh='+xzqhVal);  
    }
}
