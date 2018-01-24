import { Component, ViewEncapsulation,OnInit,Injector } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalSubject } from 'ng-zorro-antd';
import {BaseDetailComponent } from "../../../bizapp/base/base-detail.component";
import { mySearchService } from './mySearch.services';
@Component({
    selector: 'vehicle-search-detail',
    templateUrl: './detail.html',
    styleUrls: ['./search.component.less'],
    providers:[mySearchService]
})
export class detailComponent implements OnInit{
    constructor() {
        
        // super(injector,mySearchService);
        // debugger;
    }
      
    ngOnInit() {
        // this.setPageSize(10);
    }
//     handleCancel(e) {
//      this.subject.destroy('onCancel');
//    }
    
}
