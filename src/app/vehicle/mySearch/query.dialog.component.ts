import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalSubject } from 'ng-zorro-antd';
import {QueryForm } from "../../../bizapp/base/base-list.component";
export class MyQueryForms extends QueryForm{
    kssj:string = "";
    jssj:string = "";
}
@Component({
    selector: 'vehicle-search-query',
    templateUrl: './query.dialog.html',
    styleUrls: ['./search.component.less']
})
export class myQueryDialogComponent implements OnInit {
    queryForm: MyQueryForms = new MyQueryForms();
    constructor(private http: _HttpClient,private subject: NzModalSubject) {}
    
    ngOnInit() {
        
    }
    emitDataOutside() {
      this.subject.next(this.queryForm);
      this.subject.destroy('onCancel');
    }
//     handleCancel(e) {
//      this.subject.destroy('onCancel');
//    }
    
}
