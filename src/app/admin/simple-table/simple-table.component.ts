import { Component } from '@angular/core';
import { SimpleTableColumn } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-simple-table',
    templateUrl: './simple-table.component.html'
})
export class SimpleTableComponent {
    url = `remote/api/rest/testRec`;
    params = { a: 1, _allow_anonymous: true };
    // mock
    total = 100;
    columns: SimpleTableColumn[] = [
        { title: '编号', index: 'testrecid' },
        { title: '头像', type: 'img', width: '50px', index: 'testpic' },
        { title: '名称', index: 'testname' },
        { title: '数字', index: 'testamount' },
        { title: '注册时间', type: 'date', index: 'testdate' },
        {
            title: '操作区',
            buttons: [
                { text: '删除', type: 'del', click: (record: any) => this.msg.success(`${record.email} has deleted!`) }
            ]
        }
    ];

    constructor(private msg: NzMessageService) {}
}
