import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { QueryDialogComponent } from './query.dialog.component';



import * as moment from 'moment';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'vehicle-card-list',
    templateUrl: './search.component.html',
    styles: [`
    :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 4px;
    }
    :host ::ng-deep nz-list nz-card {
        margin-bottom: 0 !important;
    }
    :host ::ng-deep .card-item-content {
        display: flex;
        margin-top: 16px;
        margin-bottom: -4px;
        line-height: 20px;
        height: 20px;
        justify-content: space-between;
    }
    `],
    encapsulation: ViewEncapsulation.Emulated
})
export class SearchComponent implements OnInit {
    q: any = {
        ps: 8,
        categories: [],
        owners: [ 'zxx' ]
    };

    list: any[] = [ ];

    loading = true;

    // region: cateogry
    filters = [
        { id: 0, text: '全部', value: false },
        { id: 1, text: '车牌号码', value: false },
        { id: 2, text: '号牌种类', value: false },
        { id: 3, text: '车辆品牌', value: false },
        { id: 4, text: '车辆颜色', value: false }
    ];

    changeFilter(status: boolean, idx: number) {
        if (idx === 0) {
            this.filters.map(i => i.value = status);
        } else {
            this.filters[idx].value = status;
        }
        this.getData();
    }

    
    // region: cateogry
    categories = [
        { id: 0, text: '全部', value: false },
        { id: 1, text: '长沙', value: false },
        { id: 2, text: '株州', value: false },
        { id: 3, text: '衡阳', value: false },
        { id: 4, text: '张家界', value: false },
        { id: 5, text: '郴州', value: false },
        { id: 6, text: '怀化', value: false },
        { id: 7, text: '湘西州', value: false }
    ];

    changeCategory(status: boolean, idx: number) {
        if (idx === 0) {
            this.categories.map(i => i.value = status);
        } else {
            this.categories[idx].value = status;
        }
        this.getData();
    }
    // endregion
    constructor(private http: _HttpClient, public msg: NzMessageService, private modal: NzModalService) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.loading = true;
        let url = 'elastic/api/service/analysis/vehicle/find';
        url = 'remote/api/rest/vehicleSearchResult';
        this.http.get(url, {beginDate:'2017-12-01', endDate:'2017-12-01', licenseType:'02', rowLimit: this.q.ps }).subscribe((res: any) => {
            if (res.resultCode == 0){
                this.list = res.rows.map(item => {
                    //if (item.updatedAt) item.updatedAt = moment(item.updatedAt).fromNow();
                    return item;
                });    
            }else{
                
            }
            this.loading = false;
        });
    }

    vehicleSearchClick(){
        //alert('aaa');
        let size: '' | 'lg' | 'sm' = '';
        let options = {
            wrapClassName: size ? 'modal-' + size : '',
            content: QueryDialogComponent,
            footer: false,
            componentParams: {
                name: 'From Parent Data'
            }
        };
        this.modal.open(options).subscribe(result => {
            //this.msg.info(`subscribe status: ${JSON.stringify(result)}`);
        });
    }
}