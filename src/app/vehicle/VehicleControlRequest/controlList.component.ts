import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent,QueryForm } from "../../../bizapp/base/base-list.component";
import { NzMessageService } from 'ng-zorro-antd';
import { ControlListService } from "./controlList.service";

export class MyForm extends QueryForm{
    hphm:string = "";
    bkqssj:string = "";
    bkjzsj:string = "";
    YgNetLoginToken:string = "b690732a-212b-4e74-bf2f-d13b37feb8b0";
    YgNetLoginId:string = "yangguangnaite";
    tokenServerName:string = "ssov3";

}

@Component({
    selector: 'app-control',
    templateUrl: './controlList.component.html'
})
export class ControlListComponent extends BaseListComponent implements OnInit {
    constructor(cl:ControlListService,Injector:Injector,private message: NzMessageService){
        super(Injector,cl);
        this.queryForm = new MyForm();
     }
    pi = 1;
    ps = 10;
    total = 200; // mock total
    list = [];
    loading = false;
    args: any = { };
    _indeterminate = false;
    _allChecked = false;

    ngOnInit() {
        this.setPageSize(10);
        this.getList("seach",1,10);
     }

     getTableList(){

     }
     showMsg(msg: string,row) {
        // this.message.info(msg);
        this.onDeleteRow(row);
    }
}
