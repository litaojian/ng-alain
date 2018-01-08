import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService }  from '../../../base/dialog.service';


@Component({
    selector: 'app-extras-poi-edit',
    templateUrl: './edit.component.html'
})
export class ExtrasPoiEditComponent implements OnInit {
    i: any;
    cat: string[] = [ '美食', '美食,粤菜', '美食,粤菜,湛江菜' ];

    constructor(
        private modalHelper: DialogService,
        private subject: NzModalSubject,
        public msgSrv: NzMessageService) { }

    ngOnInit() {
        if (this.i.id > 0) {
            //this.http.get('./assets/pois.json').subscribe(res => this.i = res.data[0]);
        }
    }

    save() {
        // this.http.get('./assets/pois.json').subscribe(() => {
        //     this.msgSrv.success('保存成功，只是模拟，实际未变更');
        //     this.subject.next({});
        //     this.close();
        // });
    }

    close() {
        this.subject.destroy();
    }
}
