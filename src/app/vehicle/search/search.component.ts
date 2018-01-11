import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { QueryDialogComponent } from './query.dialog.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'vehicle-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

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

    list: any[] = [];
    loading = false;

    // region: cateogry
    categories = [
        { id: 0, text: '全部', value: false },
        { id: 1, text: '条件一', value: false },
        { id: 2, text: '条件二', value: false },
        { id: 3, text: '条件三', value: false },
        { id: 4, text: '条件四', value: false },
        { id: 5, text: '条件五', value: false },
        { id: 6, text: '条件六', value: false },
        { id: 7, text: '条件七', value: false }
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

    constructor(private http: _HttpClient, private modalService: NzModalService) {}

    ngOnInit() {
        this.getData();
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
          content        : QueryDialogComponent,
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
          console.log(result);
        })
      }

}
