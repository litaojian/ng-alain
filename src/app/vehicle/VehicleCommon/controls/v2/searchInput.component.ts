import { Component, HostBinding, ViewChild, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
declare var $:any;
@Component({
    selector: 'search-input',
    template: `
    <nz-input nzPlaceHolder='请输入号牌号码' [(ngModel)]="q"
        (nzFocus)="qFocus()" (nzBlur)="qBlur()" (keyup)="enterEvent($event)">
        <ng-template #prefix>
            <i class="anticon anticon-search" (click)="searchData()"></i>
        </ng-template>
    </nz-input>
    `,
     providers:[DatePipe]
})
export class HeaderSearchComponent implements AfterViewInit {

    q: string;
    kssj:any;
    jssj:any;
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
        public msg: NzMessageService,
         private DatePipe: DatePipe
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
    enterEvent(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            this.searchData();
        }
    }
    searchData(){
        var newDate = new Date();
        var newDate1=(newDate.getTime()-3*24*3600*1000);
        var oneweekdate = new Date(newDate1);
        this.kssj=this.DatePipe.transform(oneweekdate,'y-MM-dd HH:mm:ss');
        this.jssj=this.DatePipe.transform(new Date(),'y-MM-dd HH:mm:ss');
        if(this.q==''||this.q==undefined){
           this.msg.create('error','查询内容不能为空');
           return;
        }
        this.router.navigate(['/trackSearch/input'],{queryParams:{'hphm':this.q,'kssj': this.kssj,'jssj':this.jssj}});//传递参数
    }
}
