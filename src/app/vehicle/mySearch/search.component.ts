import { Component, ViewEncapsulation, OnInit,Injector } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { myQueryDialogComponent } from './query.dialog.component';
import { NzModalService } from 'ng-zorro-antd';
import { mySearchService } from './mySearch.services';
import { BaseListComponent } from "yg-widget/my-app/";
import { MyQueryForms } from "./query.dialog.component";

export class MyQueryForm1 extends MyQueryForms{

}
@Component({
    selector: 'vehicle-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less'],
    providers:[mySearchService]
})
export class mySearchComponent extends BaseListComponent implements OnInit {
    queryForm: MyQueryForm1 = new MyQueryForm1();
    list: any[] = [];
    loading = false;
    categories = [
        { id: 0, text: '新增', value: false }
    ];
    constructor(Injector:Injector,private http: _HttpClient, private modalService: NzModalService,private mySearchService:mySearchService) {
         super(Injector,mySearchService);
    }
    ngOnInit() {
        this.setPageSize(10);
        this.getList("trackSearch",1,10);
        console.log(this.queryForm.command);
    }

    showModalForComponent() {
        const subscription = this.modalService.open({
          title          : '对话框标题',
          content        : myQueryDialogComponent,
          onOk() {
          },
          onCancel() {
            console.log('Click cancel');
          },
          footer         : false,
          componentParams: {
            name: '测试渲染Component'
          }
        });
        subscription.subscribe(result => {
            if(result.kssj!=undefined){
               this.queryForm.kssj=result.kssj;
               this.getList("trackSearch",1,10);
            }
        })
    }

}
