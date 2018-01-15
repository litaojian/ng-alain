// import { Injectable} from '@angular/core';
// import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Observable';
// import { MyDataService } from '../../admin/services/my.data.service';
// import { BaseDataService } from "../../../bizapp/base/base-data.service";
// @Injectable()
// export class mySearchService {
// 	constructor(private myDataService: MyDataService) {
//     }
// 	putOuts(body: any):any{
// 	   return this.myDataService.doGet('vehicle/api/data/rest/pass/downExcel',body);
// 	}
// 	getData(params: any):any{
// 	   return this.myDataService.doGet('vehicle/api/data/rest/pass/getdata',params); 
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
import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from "../../../bizapp/base/base-data.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class mySearchService extends BaseDataService  {
    constructor(protected injector:Injector){
        super(injector);
        this.setApiUrl("/api/rest/passrec");
        this.setIsTest(false);
        this.setIdField("fxbh");
    }

}
