import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from "../../../bizapp/base/base-data.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ControlListService extends BaseDataService  {
    constructor(protected injector:Injector){
        super(injector);
        this.setApiUrl("/api/rest/carControl");
        this.setIsTest(false);
        this.setIdField("bkxh");
    }

}
