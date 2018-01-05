import { Component, HostBinding, ViewChild, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'search-input',
    template: `
    <nz-input nzPlaceHolder='请输入号牌号码' [(ngModel)]="q"
        (nzFocus)="qFocus()" (nzBlur)="qBlur()">
        <ng-template #prefix>
            <i class="anticon anticon-search" (click)="searchData()"></i>
        </ng-template>
    </nz-input>
    `
})
export class HeaderSearchComponent implements AfterViewInit {

    q: string;

    qIpt: HTMLInputElement;

    @HostBinding('class.header-search__focus')
    focus = false;

    @HostBinding('class.header-search__toggled')
    searchToggled = false;

    @Input()
    set toggleChange(value: boolean) {
        if (typeof value === 'undefined') return;
        console.log('toggleChange', value);
        this.searchToggled = true;
        this.focus = true;
        setTimeout(() => this.qIpt.focus(), 300);
    }

    constructor(
        private el: ElementRef,
        private router:Router,
        public msg: NzMessageService
    ) {}

    ngAfterViewInit() {
        this.qIpt = (this.el.nativeElement as HTMLElement).querySelector('.ant-input') as HTMLInputElement;
    }

    qFocus() {
        this.focus = true;
    }
    
    qBlur() {
        this.focus = false;
        this.searchToggled = false;
    }
    searchData(){
        if(this.q==''||this.q==undefined){
           this.msg.create('error','查询内容不能为空');
           return;
        }
        this.router.navigate(['/trackSearch/list'],{queryParams:{'hphm':this.q}});//传递参数
    }
}
