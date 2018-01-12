import { Component, ViewEncapsulation, OnInit,Injector } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { myQueryDialogComponent } from './query.dialog.component';
import { NzModalService } from 'ng-zorro-antd';
import { mySearchService } from './mySearch.services';
import { BaseListComponent,QueryForm } from "../../../bizapp/base/base-list.component";
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
    data = [
        {
          key    : '1',
          name   : 'John Brown',
          age    : 32,
          address: 'New York No. 1 Lake Park',
        }, {
          key    : '2',
          name   : 'Jim Green',
          age    : 42,
          address: 'London No. 1 Lake Park',
        }, {
          key    : '3',
          name   : 'Joe Black',
          age    : 32,
          address: 'Sidney No. 1 Lake Park',
        }
    ];

    q: any = {
        ps: 5,
        categories: [],
        owners: [ 'zxx' ]
    };
    p:any={
        kssj:''
    }
    list: any[] = [];
    loading = false;

    // region: cateogry
    categories = [
        { id: 0, text: '新增', value: false }
    ];

    changeCategory(status: boolean, idx: number) {
        if (idx === 0) {
            this.categories.map(i => i.value = status);
        } else {
            this.categories[idx].value = status;
        }
        //alert("idx=" + idx);
        this.showModalForComponent();
    }
    // endregion

    // region: owners
    owners = [
        {
            id: 'wzj',
            name: '我自己',
        },
        {
            id: 'wjh',
            name: '吴家豪',
        },
        {
            id: 'zxx',
            name: '周星星',
        },
        {
            id: 'zly',
            name: '赵丽颖',
        },
        {
            id: 'ym',
            name: '姚明',
        }
    ];

    setOwner() {
        this.q.owners = [`wzj`];
    }
    // endregion

    constructor(Injector:Injector,private http: _HttpClient, private modalService: NzModalService,private mySearchService:mySearchService) {
         super(Injector,mySearchService);
    }

    ngOnInit() {
        this.getData();
        this.setPageSize(10);
        this.queryForm.kssj="2017-10-12";
        this.getList("seach",1,10);
        console.log(this.queryForm.command);
    }

    getData() {
        this.loading = true;
        this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
            this.list = res;
            this.loading = false;
        });
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
         
          this.queryForm.kssj=result.kssj;
          console.log(result.length);
        })
    }

}
