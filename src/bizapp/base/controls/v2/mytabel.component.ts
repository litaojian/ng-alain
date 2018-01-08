import { Component,Input, Output,forwardRef,OnInit,ElementRef,EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,NgControl} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import { MyTabelService } from './mytabel.service';
import { NzModalService } from 'ng-zorro-antd';
declare var $:any;
@Component({
     selector: 'my-table',
     templateUrl: './mytabel.component.html',
     styles: [],
     providers: [MyTabelService]
})
export class TabelComponent implements OnInit, ControlValueAccessor{
    _totalData:any[]=[];
    _data: any;
    pagination:any;
    _searchdata: any;
    pageIndex: any;
    pageSize: any;
    data: any[] = [];
    datanums:any;
    currentModal:any;
    @Input()
    searchData:any;
    @Input()
    Myurl:any;
    @Output() tableLists = new EventEmitter<any>();
    _onChange = (_: any) => { };
    constructor(
		private _element: ElementRef,
		private MyTabelService: MyTabelService,
		private modalService: NzModalService
	 ) {
         this.pagination = {
            curPage: 1,
            rows: 10
         };
	}
  @Input()
	set ifUrl(v: any) {//监听定义ifUrl的值是否发生变化
        this._data=v;
        if(this._data==true){
           this.pagination.curPage=1;
           this.getTabelList();
        }
	}
	get ifUrl(): any {
		return this._data;
	}
    writeValue(value: any) {
       
    }
   ngOnInit() {
        //  this.pageIndex=this.pagination.curPage;
        //  this.pageSize=this.pagination.rows;
	}
   //页数变化
   indexChange(e){
        //  alert(12);
         this.pagination.curPage=e;
         this.getTabelList();
   }
   registerOnChange(fn: any) {
        this._onChange = fn;
   }
    registerOnTouched(fn: any) { }
    private _updateValue(val: any) {
		this.tableLists.emit(val);  // 事件
	}
    //  private _updateUrlValue(val: any) {
	// 	this.ifUrlChange.emit(val);  // 事件
	// }
    private getTabelList() {
         this._totalData=[];
         this._searchdata = $.extend({}, this.searchData, this.pagination);
         console.log(this._searchdata);
		 this.MyTabelService.getData(this.Myurl,this._searchdata).subscribe(data => {
               this.data=data.data;
               this.datanums=data.count;
               this._data=false;
               this._totalData.push(this.data);
               this._totalData.push(this._data);
               this._updateValue(this._totalData);
         })
	}
}