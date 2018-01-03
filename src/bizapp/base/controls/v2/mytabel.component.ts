import { Component,Input, Output,forwardRef,OnInit,ElementRef,EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,NgControl} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import { MyTabelService } from './mytabel.service';
import { NzModalService } from 'ng-zorro-antd';
@Component({
     selector: 'my-table',
     templateUrl: './mytabel.component.html',
     styles: [],
     providers: [MyTabelService]
})
export class TabelComponent implements OnInit, ControlValueAccessor{
    _totalData:any[]=[];
    _data: any;
    _searchdata: any;
    data: any[] = [];
    datanums:any;
    currentModal:any;
    @Input()
    Myurl:any;
    @Output() tableLists = new EventEmitter<any>();
    _onChange = (_: any) => { };
    constructor(
		private _element: ElementRef,
		private MyTabelService: MyTabelService,
		private modalService: NzModalService
	 ) {
	}
  @Input()
	set ifUrl(v: any) {//监听定义ifUrl的值是否发生变化
        this._data=v;
        if(this._data==true){       
           this.getTabelList();
        }
	}
	get ifUrl(): any {
		return this._data;
	}
    @Input()
    set searchData(v: any){
        this._searchdata=v;
    }
    get searchData(): any {
		return this._searchdata;
	}
    writeValue(value: any) {
       
    }
   ngOnInit() {
        // alert(this.Myurl)
	}
   //页数变化
   indexChange(e){
      this._searchdata._page=e;
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
		 this.MyTabelService.getData(this._searchdata,this.Myurl).subscribe(data => {
               this.data=data.rows;
               this.datanums=data.total;
               this._data=false;
               this._totalData.push(this.data);
               this._totalData.push(this._data);
               this._updateValue(this._totalData);
         })
	}
}